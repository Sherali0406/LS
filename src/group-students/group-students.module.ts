import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { GroupStudents } from "./model/group-student.mode";
import { GroupStudentsController } from "./group-students.controller";
import { GroupStudentsService } from "./group-students.service";
import { JwtModule } from "@nestjs/jwt";
import { Students } from "../students/model/student.model";
import { Groups } from "../group/model/group.model";
import { StudentsService } from "../students/students.service";
import { GroupsService } from "../group/group.service";
import { RoomsService } from "../rooms/rooms.service";
import { Rooms } from "../rooms/model/room.model";
import { CoursesService } from "../courses/courses.service";
import { Courses } from "../courses/model/course.model";
import { Teachers } from "../teacher/model/teacher.model";
import { TeachersService } from "../teacher/teachers.service";
import { Lesson } from "../lesson/model/lesson.model";
import { LessonService } from "../lesson/lesson.service";

@Module({
  imports: [
    SequelizeModule.forFeature([GroupStudents,Students,Groups,Rooms,Courses,Teachers,Lesson]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY_AD,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [GroupStudentsController],
  providers: [GroupStudentsService,StudentsService,GroupsService,RoomsService,CoursesService,TeachersService,LessonService],
})
export class GroupStudentsModule {}
