import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { GroupTeachersController } from "./group-teacher.controller";
import { GroupTeachersService } from "./group-teacher.service";
import { GroupTeacher } from "./model/group-teacher.model";

@Module({
  imports: [SequelizeModule.forFeature([GroupTeacher])],
  controllers: [GroupTeachersController],
  providers: [GroupTeachersService],
})
export class GroupTeachersModule {}
