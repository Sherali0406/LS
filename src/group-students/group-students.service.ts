import { StudentsService } from "./../students/students.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateGroupStudentsDto } from "./dto/create-group-student.dto";
import { UpdateGroupStudentsDto } from "./dto/update-group-student.dto";
import { GroupStudents } from "./model/group-student.mode";
import { GroupsService } from "../group/group.service";

@Injectable()
export class GroupStudentsService {
  constructor(
    @InjectModel(GroupStudents) private groupStudentsRepo: typeof GroupStudents,
    private readonly studentsService: StudentsService,
    private readonly groupsService: GroupsService
  ) {}

  async create(createGroupStudentsDto: CreateGroupStudentsDto) {
    try {
      // const group = await this.groupsService.fetchSingleGroup(
      //   createGroupStudentsDto.group
      // );

      // if (!group) {
      //   throw new BadRequestException("Group is not found");
      // }
      // const student = await this.studentsService.findByPhoneNumber(
      //   createGroupStudentsDto.student_phone
      // );

      // if (!student) {
      //   throw new BadRequestException("Student is not found");
      // }
      const exist = await this.groupStudentsRepo.findOne({
        where: {
          group: createGroupStudentsDto.group,
          student_phone: createGroupStudentsDto.student_phone,
        },
      });

      if (exist) {
        throw new BadRequestException(
          "This Student is already joined to group"
        );
      }
      const group_student = await this.groupStudentsRepo.create(
        createGroupStudentsDto
      );
      return group_student;
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Bad request");
    }
  }

  async findGroup_studentById(id: number): Promise<GroupStudents> {
    const group_students = await this.groupStudentsRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return group_students;
  }

  async update(
    id: number,
    updateGroupStudentsDto: UpdateGroupStudentsDto
  ): Promise<GroupStudents> {
    const [_, [updatedGroupStudentsDto]] = await this.groupStudentsRepo.update(
      updateGroupStudentsDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (!updatedGroupStudentsDto) {
      throw new BadRequestException("Group_student not found or not updated");
    }

    return updatedGroupStudentsDto;
  }

  async getAllGroupStudents(
    page: number = 1,
    limit: number = 10
  ): Promise<{ groupStudents: GroupStudents[]; total: number }> {
    const offset = (page - 1) * limit;

    const groupStudents = await this.groupStudentsRepo.findAll({
      limit,
      offset,
      include: { all: true },
    });

    const total = await this.groupStudentsRepo.count();

    return { groupStudents, total };
  }

  async remove(id: number) {
    const del = this.groupStudentsRepo.destroy({ where: { id } });
    return del;
  }
}
