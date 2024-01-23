import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CoursesController } from "./courses.controller";
import { Courses } from "./model/course.model";

@Module({
  imports: [SequelizeModule.forFeature([Courses])],

  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
