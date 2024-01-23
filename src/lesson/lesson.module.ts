import { Module } from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { LessonController } from "./lesson.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Lesson } from "./model/lesson.model";
import { Groups } from "../group/model/group.model";
import { GroupsService } from "../group/group.service";
import { Rooms } from "../rooms/model/room.model";
import { RoomsService } from "../rooms/rooms.service";
import { CoursesService } from "../courses/courses.service";
import { TeachersService } from "../teacher/teachers.service";
import { Courses } from "../courses/model/course.model";
import { Teachers } from "../teacher/model/teacher.model";
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
  SequelizeModule.forFeature([Lesson, Groups, Rooms, Courses, Teachers]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY_AD,
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [LessonController],
  providers: [
    LessonService,
    GroupsService,
    RoomsService,
    CoursesService,
    TeachersService,
  ],
})
export class LessonModule {}
