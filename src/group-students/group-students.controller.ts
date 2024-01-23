import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateGroupStudentsDto } from "./dto/create-group-student.dto";
import { UpdateGroupStudentsDto } from "./dto/update-group-student.dto";
import { GroupStudentsService } from "./group-students.service";
import { GroupStudents } from "./model/group-student.mode";
@ApiTags("GROUP_STUDENTS")
@Controller("groupStudents")
export class GroupStudentsController {
  constructor(private readonly groupStudentsService: GroupStudentsService) {}

  @Post()
  async create(@Body() createGroupStudentDto: CreateGroupStudentsDto) {
    return this.groupStudentsService.create(createGroupStudentDto);
  }

  @Get()
  async getAllGroupStudents(
    @Query("page") page: number,
    @Query("limit") limit: number
  ): Promise<{ groupStudents: GroupStudents[]; total: number }> {
    return this.groupStudentsService.getAllGroupStudents(page, limit);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<GroupStudents> {
    return this.groupStudentsService.findGroup_studentById(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateGroupStudentsDto: UpdateGroupStudentsDto
  ) {
    return this.groupStudentsService.update(+id, updateGroupStudentsDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.groupStudentsService.remove(+id);
  }
}
