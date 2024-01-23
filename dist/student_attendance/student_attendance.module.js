"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAttendanceModule = void 0;
const common_1 = require("@nestjs/common");
const student_attendance_service_1 = require("./student_attendance.service");
const student_attendance_controller_1 = require("./student_attendance.controller");
const admin_model_1 = require("../admin/model/admin.model");
const teacher_model_1 = require("../teacher/model/teacher.model");
const sequelize_1 = require("@nestjs/sequelize");
const student_model_1 = require("../students/model/student.model");
const room_model_1 = require("../rooms/model/room.model");
const role_model_1 = require("../role/model/role.model");
const group_model_1 = require("../group/model/group.model");
const admin_service_1 = require("../admin/admin.service");
const students_service_1 = require("../students/students.service");
const teachers_service_1 = require("../teacher/teachers.service");
const rooms_service_1 = require("../rooms/rooms.service");
const role_service_1 = require("../role/role.service");
const group_service_1 = require("../group/group.service");
const group_students_service_1 = require("../group-students/group-students.service");
const group_student_mode_1 = require("../group-students/model/group-student.mode");
const group_teacher_model_1 = require("../group-teacher/model/group-teacher.model");
const group_teacher_service_1 = require("../group-teacher/group-teacher.service");
const jwt_1 = require("@nestjs/jwt");
const courses_service_1 = require("../courses/courses.service");
const course_model_1 = require("../courses/model/course.model");
const student_attendance_model_1 = require("./model/student_attendance.model");
const lesson_model_1 = require("../lesson/model/lesson.model");
const lesson_service_1 = require("../lesson/lesson.service");
let StudentAttendanceModule = exports.StudentAttendanceModule = class StudentAttendanceModule {
};
exports.StudentAttendanceModule = StudentAttendanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                admin_model_1.Admin,
                student_model_1.Students,
                teacher_model_1.Teachers,
                room_model_1.Rooms,
                role_model_1.Roles,
                group_model_1.Groups,
                group_student_mode_1.GroupStudents,
                group_teacher_model_1.GroupTeacher,
                course_model_1.Courses,
                student_attendance_model_1.StudentAttendance,
                lesson_model_1.Lesson,
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.ACCESS_TOKEN_KEY_AD,
                signOptions: { expiresIn: "24h" },
            }),
        ],
        controllers: [student_attendance_controller_1.StudentAttendanceController],
        providers: [
            student_attendance_service_1.StudentAttendanceService,
            admin_service_1.AdminService,
            students_service_1.StudentsService,
            teachers_service_1.TeachersService,
            rooms_service_1.RoomsService,
            role_service_1.RolesService,
            group_service_1.GroupsService,
            group_students_service_1.GroupStudentsService,
            group_teacher_service_1.GroupTeachersService,
            courses_service_1.CoursesService,
            lesson_service_1.LessonService,
        ],
    })
], StudentAttendanceModule);
//# sourceMappingURL=student_attendance.module.js.map