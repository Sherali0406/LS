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
exports.GroupStudentsService = void 0;
const students_service_1 = require("./../students/students.service");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const group_student_mode_1 = require("./model/group-student.mode");
const group_service_1 = require("../group/group.service");
let GroupStudentsService = exports.GroupStudentsService = class GroupStudentsService {
    constructor(groupStudentsRepo, studentsService, groupsService) {
        this.groupStudentsRepo = groupStudentsRepo;
        this.studentsService = studentsService;
        this.groupsService = groupsService;
    }
    async create(createGroupStudentsDto) {
        try {
            const exist = await this.groupStudentsRepo.findOne({
                where: {
                    group: createGroupStudentsDto.group,
                    student_phone: createGroupStudentsDto.student_phone,
                },
            });
            if (exist) {
                throw new common_1.BadRequestException("This Student is already joined to group");
            }
            const group_student = await this.groupStudentsRepo.create(createGroupStudentsDto);
            return group_student;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException("Bad request");
        }
    }
    async findGroup_studentById(id) {
        const group_students = await this.groupStudentsRepo.findOne({
            where: { id },
            include: { all: true },
        });
        return group_students;
    }
    async update(id, updateGroupStudentsDto) {
        const [_, [updatedGroupStudentsDto]] = await this.groupStudentsRepo.update(updateGroupStudentsDto, {
            where: { id },
            returning: true,
        });
        if (!updatedGroupStudentsDto) {
            throw new common_1.BadRequestException("Group_student not found or not updated");
        }
        return updatedGroupStudentsDto;
    }
    async getAllGroupStudents(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const groupStudents = await this.groupStudentsRepo.findAll({
            limit,
            offset,
            include: { all: true },
        });
        const total = await this.groupStudentsRepo.count();
        return { groupStudents, total };
    }
    async remove(id) {
        const del = this.groupStudentsRepo.destroy({ where: { id } });
        return del;
    }
};
exports.GroupStudentsService = GroupStudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(group_student_mode_1.GroupStudents)),
    __metadata("design:paramtypes", [Object, students_service_1.StudentsService,
        group_service_1.GroupsService])
], GroupStudentsService);
//# sourceMappingURL=group-students.service.js.map