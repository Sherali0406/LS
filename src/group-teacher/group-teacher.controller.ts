import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateGroupTeacherDto } from "./dto/create-group-teacher.dto";
import { UpdateGroupTeacherDto } from "./dto/update-group-teacher.dto";
import { GroupTeachersService } from "./group-teacher.service";
import { GroupTeacher } from "./model/group-teacher.model";

@ApiTags("Group teacher")
@Controller("groupTeachers")
export class GroupTeachersController {
  constructor(private readonly groupTeachersService: GroupTeachersService) {}

  @Post()
  async create(@Body() createGroupTeacherDto: CreateGroupTeacherDto) {
    return this.groupTeachersService.create(createGroupTeacherDto);
  }


  @Get(":id")
  async findOne(@Param("id") id: string): Promise<GroupTeacher> {
    return this.groupTeachersService.findOne(+id);
  }

  @Get()
  getAllGroupTeachers(): Promise<GroupTeacher[]> {
    return this.groupTeachersService.getAllGroupTeachers();
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateGroupTeacherDto: UpdateGroupTeacherDto
  ) {
    return this.groupTeachersService.update(+id, updateGroupTeacherDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.groupTeachersService.remove(+id);
  }
}
