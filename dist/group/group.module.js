"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModule = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const group_controller_1 = require("./group.controller");
const group_service_1 = require("./group.service");
const group_model_1 = require("./model/group.model");
const course_model_1 = require("../courses/model/course.model");
const room_model_1 = require("../rooms/model/room.model");
const teacher_model_1 = require("../teacher/model/teacher.model");
const rooms_service_1 = require("../rooms/rooms.service");
const courses_service_1 = require("../courses/courses.service");
const teachers_service_1 = require("../teacher/teachers.service");
const jwt_1 = require("@nestjs/jwt");
const lesson_model_1 = require("../lesson/model/lesson.model");
const lesson_service_1 = require("../lesson/lesson.service");
let GroupModule = exports.GroupModule = class GroupModule {
};
exports.GroupModule = GroupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([group_model_1.Groups, course_model_1.Courses, room_model_1.Rooms, teacher_model_1.Teachers, lesson_model_1.Lesson]),
            jwt_1.JwtModule.register({
                secret: process.env.ACCESS_TOKEN_KEY_AD,
                signOptions: { expiresIn: "24h" },
            }),
        ],
        controllers: [group_controller_1.GroupsController],
        providers: [group_service_1.GroupsService, rooms_service_1.RoomsService, courses_service_1.CoursesService, teachers_service_1.TeachersService, lesson_service_1.LessonService],
    })
], GroupModule);
//# sourceMappingURL=group.module.js.map