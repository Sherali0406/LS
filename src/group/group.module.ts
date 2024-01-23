import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { GroupsController } from "./group.controller";
import { GroupsService } from "./group.service";
import { Groups } from "./model/group.model";
import { Courses } from "../courses/model/course.model";
import { Rooms } from "../rooms/model/room.model";
import { Teachers } from "../teacher/model/teacher.model";
import { RoomsService } from "../rooms/rooms.service";
import { CoursesService } from "../courses/courses.service";
import { TeachersService } from "../teacher/teachers.service";
import { JwtModule } from "@nestjs/jwt";
import { Lesson } from "../lesson/model/lesson.model";
import { LessonService } from "../lesson/lesson.service";

@Module({
  imports: [
    SequelizeModule.forFeature([Groups, Courses, Rooms, Teachers,Lesson]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY_AD,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [GroupsController],
  providers: [GroupsService, RoomsService, CoursesService, TeachersService,LessonService],
})
export class GroupModule {}
