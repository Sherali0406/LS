"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const group_students_module_1 = require("./group-students/group-students.module");
const teacher_model_1 = require("./teacher/model/teacher.model");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const admin_model_1 = require("./admin/model/admin.model");
const admin_module_1 = require("./admin/admin.module");
const students_module_1 = require("./students/students.module");
const courses_module_1 = require("./courses/courses.module");
const student_model_1 = require("./students/model/student.model");
const course_model_1 = require("./courses/model/course.model");
const teachers_module_1 = require("./teacher/teachers.module");
const rooms_module_1 = require("./rooms/rooms.module");
const room_model_1 = require("./rooms/model/room.model");
const group_model_1 = require("./group/model/group.model");
const group_teacher_module_1 = require("./group-teacher/group-teacher.module");
const group_teacher_model_1 = require("./group-teacher/model/group-teacher.model");
const group_module_1 = require("./group/group.module");
const role_module_1 = require("./role/role.module");
const role_model_1 = require("./role/model/role.model");
const group_student_mode_1 = require("./group-students/model/group-student.mode");
const student_attendance_module_1 = require("./student_attendance/student_attendance.module");
const student_attendance_model_1 = require("./student_attendance/model/student_attendance.model");
const lesson_module_1 = require("./lesson/lesson.module");
const lesson_model_1 = require("./lesson/model/lesson.model");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: "postgres",
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: String(process.env.POSTGRES_PASSWORD),
                database: process.env.POSTGRES_DB,
                models: [
                    admin_model_1.Admin,
                    student_model_1.Students,
                    course_model_1.Courses,
                    teacher_model_1.Teachers,
                    room_model_1.Rooms,
                    group_model_1.Groups,
                    group_teacher_model_1.GroupTeacher,
                    role_model_1.Roles,
                    group_student_mode_1.GroupStudents,
                    lesson_model_1.Lesson,
                    student_attendance_model_1.StudentAttendance,
                ],
                autoLoadModels: true,
                logging: false,
            }),
            admin_module_1.AdminModule,
            students_module_1.StudentsModule,
            courses_module_1.CoursesModule,
            teachers_module_1.TeachersModule,
            rooms_module_1.RoomsModule,
            group_module_1.GroupModule,
            group_teacher_module_1.GroupTeachersModule,
            role_module_1.RoleModule,
            group_students_module_1.GroupStudentsModule,
            lesson_module_1.LessonModule,
            student_attendance_module_1.StudentAttendanceModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map