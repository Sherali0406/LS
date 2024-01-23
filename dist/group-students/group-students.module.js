"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupStudentsModule = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const group_student_mode_1 = require("./model/group-student.mode");
const group_students_controller_1 = require("./group-students.controller");
const group_students_service_1 = require("./group-students.service");
const jwt_1 = require("@nestjs/jwt");
const student_model_1 = require("../students/model/student.model");
const group_model_1 = require("../group/model/group.model");
const students_service_1 = require("../students/students.service");
const group_service_1 = require("../group/group.service");
const rooms_service_1 = require("../rooms/rooms.service");
const room_model_1 = require("../rooms/model/room.model");
const courses_service_1 = require("../courses/courses.service");
const course_model_1 = require("../courses/model/course.model");
const teacher_model_1 = require("../teacher/model/teacher.model");
const teachers_service_1 = require("../teacher/teachers.service");
const lesson_model_1 = require("../lesson/model/lesson.model");
const lesson_service_1 = require("../lesson/lesson.service");
let GroupStudentsModule = exports.GroupStudentsModule = class GroupStudentsModule {
};
exports.GroupStudentsModule = GroupStudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([group_student_mode_1.GroupStudents, student_model_1.Students, group_model_1.Groups, room_model_1.Rooms, course_model_1.Courses, teacher_model_1.Teachers, lesson_model_1.Lesson]),
            jwt_1.JwtModule.register({
                secret: process.env.ACCESS_TOKEN_KEY_AD,
                signOptions: { expiresIn: "24h" },
            }),
        ],
        controllers: [group_students_controller_1.GroupStudentsController],
        providers: [group_students_service_1.GroupStudentsService, students_service_1.StudentsService, group_service_1.GroupsService, rooms_service_1.RoomsService, courses_service_1.CoursesService, teachers_service_1.TeachersService, lesson_service_1.LessonService],
    })
], GroupStudentsModule);
//# sourceMappingURL=group-students.module.js.map