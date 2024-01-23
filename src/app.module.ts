import { GroupStudentsModule } from "./group-students/group-students.module";
import { Teachers } from "./teacher/model/teacher.model";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "./admin/model/admin.model";
import { AdminModule } from "./admin/admin.module";
import { StudentsModule } from "./students/students.module";
import { CoursesModule } from "./courses/courses.module";
import { Students } from "./students/model/student.model";
import { Courses } from "./courses/model/course.model";
import { TeachersModule } from "./teacher/teachers.module";
import { RoomsModule } from "./rooms/rooms.module";
import { Rooms } from "./rooms/model/room.model";
import { Groups } from "./group/model/group.model";
import { GroupTeachersModule } from "./group-teacher/group-teacher.module";
import { GroupTeacher } from "./group-teacher/model/group-teacher.model";
import { GroupModule } from "./group/group.module";
import { RoleModule } from "./role/role.module";
import { Roles } from "./role/model/role.model";
import { GroupStudents } from "./group-students/model/group-student.mode";
import { StudentAttendanceModule } from "./student_attendance/student_attendance.module";
import { StudentAttendance } from "./student_attendance/model/student_attendance.model";
import { LessonModule } from './lesson/lesson.module';
import { Lesson } from "./lesson/model/lesson.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Students,
        Courses,
        Teachers,
        Rooms,
        Groups,
        GroupTeacher,
        Roles,
        GroupStudents,
        Lesson,
        StudentAttendance,
      ],

      autoLoadModels: true,
      logging: false,
    }),

    AdminModule,
    StudentsModule,
    CoursesModule,
    TeachersModule,
    RoomsModule,
    GroupModule,
    GroupTeachersModule,
    // DirectorModule,
    RoleModule,
    GroupStudentsModule,
    LessonModule,
    StudentAttendanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
