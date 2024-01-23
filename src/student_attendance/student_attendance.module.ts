import { Module } from "@nestjs/common";
import { StudentAttendanceService } from "./student_attendance.service";
import { StudentAttendanceController } from "./student_attendance.controller";
import { Admin } from "../admin/model/admin.model";
import { Teachers } from "../teacher/model/teacher.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Students } from "../students/model/student.model";
import { Rooms } from "../rooms/model/room.model";
import { Roles } from "../role/model/role.model";
import { Groups } from "../group/model/group.model";
import { AdminService } from "../admin/admin.service";
import { StudentsService } from "../students/students.service";
import { TeachersService } from "../teacher/teachers.service";
import { RoomsService } from "../rooms/rooms.service";
import { RolesService } from "../role/role.service";
import { GroupsService } from "../group/group.service";
import { GroupStudentsService } from "../group-students/group-students.service";
import { GroupStudents } from "../group-students/model/group-student.mode";
import { GroupTeacher } from "../group-teacher/model/group-teacher.model";
import { GroupTeachersService } from "../group-teacher/group-teacher.service";
import { JwtModule } from "@nestjs/jwt";
import { CoursesService } from "../courses/courses.service";
import { Courses } from "../courses/model/course.model";
import { StudentAttendance } from "./model/student_attendance.model";
import { Lesson } from "../lesson/model/lesson.model";
import { LessonService } from "../lesson/lesson.service";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Admin,
      Students,
      Teachers,
      Rooms,
      Roles,
      Groups,
      GroupStudents,
      GroupTeacher,
      Courses,
      StudentAttendance,
      Lesson,
    ]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY_AD,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [StudentAttendanceController],
  providers: [
    StudentAttendanceService,
    AdminService,
    StudentsService,
    TeachersService,
    RoomsService,
    RolesService,
    GroupsService,
    GroupStudentsService,
    GroupTeachersService,
    CoursesService,
    LessonService,
  ],
})
export class StudentAttendanceModule {}
