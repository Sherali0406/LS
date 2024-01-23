"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsService = void 0;
const sequelize_1 = require("sequelize");
const common_1 = require("@nestjs/common");
const sequelize_2 = require("@nestjs/sequelize");
const group_model_1 = require("./model/group.model");
const rooms_service_1 = require("../rooms/rooms.service");
const courses_service_1 = require("../courses/courses.service");
const teachers_service_1 = require("../teacher/teachers.service");
const course_model_1 = require("../courses/model/course.model");
const room_model_1 = require("../rooms/model/room.model");
const get_selected_dats_1 = require("./dto/get-selected-dats");
const lesson_service_1 = require("../lesson/lesson.service");
let GroupsService = exports.GroupsService = class GroupsService {
    constructor(groupsRepo, roomsService, coursesService, teacherService, lessonService) {
        this.groupsRepo = groupsRepo;
        this.roomsService = roomsService;
        this.coursesService = coursesService;
        this.teacherService = teacherService;
        this.lessonService = lessonService;
    }
    async createGroup(createGroupDto) {
        if (createGroupDto.start_time >= createGroupDto.end_time) {
            throw new common_1.BadRequestException("end time must be greater than start time");
        }
        const room = await this.roomsService.findRoomById(createGroupDto.room_id);
        if (!room) {
            throw new common_1.BadRequestException("Room is not found");
        }
        const course = await this.coursesService.findCourseById(createGroupDto.course_id);
        if (!course) {
            throw new common_1.BadRequestException("Course is not found");
        }
        const teacher = await this.teacherService.findByTeacherId(createGroupDto.teacher_id);
        if (!teacher) {
            throw new common_1.BadRequestException("Teacher is not found");
        }
        const exist = await this.groupsRepo.findOne({
            where: {
                name: createGroupDto.name,
            },
        });
        if (exist) {
            throw new common_1.BadRequestException("Group is already exists");
        }
        const end_date = new Date(createGroupDto.start_date);
        end_date.setMonth(end_date.getMonth() + course.period);
        const group = await this.groupsRepo.create({ ...createGroupDto });
        const selectedDays = [];
        if (group.days) {
            selectedDays.push("monday", "wednesday", "friday");
        }
        else {
            selectedDays.push("tuesday", "thursday", "saturday");
        }
        const days = (0, get_selected_dats_1.getSelectedDaysFromDate)(selectedDays, group.start_date, course.period);
        group.end_date = days.at(-1);
        days.forEach(async (day, number) => {
            await this.lessonService.generateLesson(day);
        });
        return group;
    }
    async fetchAllGroups(page, limit) {
        const page1 = +page > 0 ? +page : 1;
        const limit1 = +limit > 0 ? +limit : null;
        const groups = await this.groupsRepo.findAll({
            offset: (page1 - 1) * limit1,
            limit: limit1,
            include: ["course", "room"],
        });
        const count = await this.groupsRepo.count();
        return { groups, count };
    }
    async fetchAvailableRooms(getFreeRoomDto) {
        try {
            const groups = await group_model_1.Groups.findAll({
                where: {
                    end_date: {
                        [sequelize_1.Op.gte]: getFreeRoomDto.start_date,
                    },
                    [sequelize_1.Op.or]: [
                        {
                            [sequelize_1.Op.and]: [
                                {
                                    start_time: {
                                        [sequelize_1.Op.lte]: getFreeRoomDto.start_time,
                                    },
                                },
                                {
                                    end_time: {
                                        [sequelize_1.Op.gte]: getFreeRoomDto.start_time,
                                    },
                                },
                            ],
                        },
                        {
                            [sequelize_1.Op.and]: [
                                {
                                    start_time: {
                                        [sequelize_1.Op.lte]: getFreeRoomDto.end_time,
                                    },
                                },
                                {
                                    end_time: {
                                        [sequelize_1.Op.gte]: getFreeRoomDto.end_time,
                                    },
                                },
                            ],
                        },
                        {
                            [sequelize_1.Op.and]: [
                                {
                                    start_time: {
                                        [sequelize_1.Op.gte]: getFreeRoomDto.start_time,
                                    },
                                },
                                {
                                    end_time: {
                                        [sequelize_1.Op.lte]: getFreeRoomDto.end_time,
                                    },
                                },
                            ],
                        },
                    ],
                    days: getFreeRoomDto.days,
                },
            });
            const busyRooms = groups.map((group) => group.room_id);
            const rooms = await room_model_1.Rooms.findAll({
                where: {
                    id: {
                        [sequelize_1.Op.notIn]: busyRooms,
                    },
                },
            });
            return rooms;
        }
        catch (error) {
            throw new common_1.BadRequestException("Error fetching available rooms");
        }
    }
    async fetchSingleGroup(id) {
        try {
            const group = await group_model_1.Groups.findOne({
                where: { id },
                include: [course_model_1.Courses, room_model_1.Rooms],
            });
            if (!group) {
                throw new common_1.BadRequestException("Group not found");
            }
            return { group };
        }
        catch (error) {
            throw new common_1.BadRequestException("Error fetching group");
        }
    }
    async findAll() {
        const groups = await this.groupsRepo.findAll({ include: { all: true } });
        return groups;
    }
    async remove(id) {
        const del = this.groupsRepo.destroy({ where: { id } });
        return del;
    }
};
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_2.InjectModel)(group_model_1.Groups)),
    __metadata("design:paramtypes", [Object, rooms_service_1.RoomsService,
        courses_service_1.CoursesService,
        teachers_service_1.TeachersService,
        lesson_service_1.LessonService])
], GroupsService);
//# sourceMappingURL=group.service.js.map