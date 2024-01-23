import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateStudentAttendanceDto } from "./dto/create-student_attendance.dto";
import { UpdateStudentAttendanceDto } from "./dto/update-student_attendance.dto";
import { StudentAttendance } from "./model/student_attendance.model";
import { GroupsService } from "../group/group.service";
import { BadRequestException } from "@nestjs/common";

@Injectable()
export class StudentAttendanceService {
  constructor(
    @InjectModel(StudentAttendance)
    private studentAttendanceRepo: typeof StudentAttendance,
    private readonly groupsService: GroupsService
  ) {}

  async create(createStudentAttendanceDto: CreateStudentAttendanceDto) {
    try {
      const exist = await this.studentAttendanceRepo.findOne({
        where: {
          participated: createStudentAttendanceDto.participated,
        },
      });
      if (exist) {
        throw new BadRequestException("This Student is participated");
      }
      const studentAttendance=await this.studentAttendanceRepo.create(createStudentAttendanceDto)
      return studentAttendance

    } catch (error) {
      console.log(error);
      throw new BadRequestException("Bad request");
    }
  }

  

  findAll() {
    return `This action returns all studentAttendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentAttendance`;
  }

  update(id: number, updateStudentAttendanceDto: UpdateStudentAttendanceDto) {
    return `This action updates a #${id} studentAttendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentAttendance`;
  }
}
