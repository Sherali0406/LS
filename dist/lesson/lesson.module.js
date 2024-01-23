"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonModule = void 0;
const common_1 = require("@nestjs/common");
const lesson_service_1 = require("./lesson.service");
const lesson_controller_1 = require("./lesson.controller");
const sequelize_1 = require("@nestjs/sequelize");
const lesson_model_1 = require("./model/lesson.model");
const group_model_1 = require("../group/model/group.model");
const group_service_1 = require("../group/group.service");
const room_model_1 = require("../rooms/model/room.model");
const rooms_service_1 = require("../rooms/rooms.service");
const courses_service_1 = require("../courses/courses.service");
const teachers_service_1 = require("../teacher/teachers.service");
const course_model_1 = require("../courses/model/course.model");
const teacher_model_1 = require("../teacher/model/teacher.model");
const jwt_1 = require("@nestjs/jwt");
let LessonModule = exports.LessonModule = class LessonModule {
};
exports.LessonModule = LessonModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([lesson_model_1.Lesson, group_model_1.Groups, room_model_1.Rooms, course_model_1.Courses, teacher_model_1.Teachers]),
            jwt_1.JwtModule.register({
                secret: process.env.ACCESS_TOKEN_KEY_AD,
                signOptions: { expiresIn: "24h" },
            }),
        ],
        controllers: [lesson_controller_1.LessonController],
        providers: [
            lesson_service_1.LessonService,
            group_service_1.GroupsService,
            rooms_service_1.RoomsService,
            courses_service_1.CoursesService,
            teachers_service_1.TeachersService,
        ],
    })
], LessonModule);
//# sourceMappingURL=lesson.module.js.map