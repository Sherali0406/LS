import { LoginTeacherDto } from './dto/login-teacher-dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from "@nestjs/common";
import { TeachersService } from "./teachers.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { Teachers } from "./model/teacher.model";
import { FindTeacherDto } from "./dto/find-teacher-dto";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CookieGetter } from '../decorators/cookieGetter.decorator';


@ApiTags("TEACHERS")
@Controller("teachers")
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  create(
    @Body() createTeacherDto: CreateTeacherDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.teachersService.create(createTeacherDto, res);
  }

  @Post("login")
  login(
    @Body() loginTeacherDto: LoginTeacherDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.teachersService.login(loginTeacherDto, res);
  }

  @Post("find")
  findAll(@Body() findTeachersDto: FindTeacherDto) {
    return this.teachersService.findAll(findTeachersDto);
  }

  @Get(":id")
  async findByTeacherId(@Param("id") id: string): Promise<Teachers> {
    return this.teachersService.findByTeacherId(+id);
  }

  @Get()
  getAllTeachers(
    @Query("page") page: number,
    @Query("limit") limit: number
  ): Promise<{ teachers: Teachers[]; total: number }> {
    return this.teachersService.getAllTeachers(page, limit);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTeacherDto: UpdateTeacherDto
  ) {
    return this.teachersService.update(+id, updateTeacherDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.teachersService.remove(+id);
  }

  @Post("signout")
  logout(
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.teachersService.logout(refresh_token, res);
  }
}
