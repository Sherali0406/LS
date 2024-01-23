import { Op } from "sequelize";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { GroupTeacher } from "./model/group-teacher.model";
import { CreateGroupTeacherDto } from "./dto/create-group-teacher.dto";
import { UpdateGroupTeacherDto } from "./dto/update-group-teacher.dto";

@Injectable()
export class GroupTeachersService {
  constructor(@InjectModel(GroupTeacher) private groupTeachersRepo: typeof GroupTeacher) {}
  
  async create(createGroupTeacherDto: CreateGroupTeacherDto): Promise<GroupTeacher> {
    const groupTeachers = await this.groupTeachersRepo.create(createGroupTeacherDto);
    return groupTeachers;
  }

  async findOne(id: number) {
    const groupTeachers = await this.groupTeachersRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return groupTeachers;
  }

  async update(
    id: number,
    updateGroupTeacherDto: UpdateGroupTeacherDto
  ): Promise<GroupTeacher> {
    const groupTeachers = await this.groupTeachersRepo.update(updateGroupTeacherDto, {
      where: { id },
      returning: true,
    });
    return groupTeachers[1][0].dataValues;
  }



  async getAllGroupTeachers(): Promise<GroupTeacher[]> {
    const groupTeachers = await this.groupTeachersRepo.findAll({
      include: { all: true },
    });
    return groupTeachers;
  }

  async remove(id: number) {
    const del = this.groupTeachersRepo.destroy({ where: { id } });
    return del;
  }
}
