import { LoginStudentDto } from "./dto/login-student-dto";
// src/students/students.controller.ts
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
import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Students } from "./model/student.model";
import { findStudentsDto } from "./dto/find-student-dto";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CookieGetter } from "../decorators/cookieGetter.decorator";

@ApiTags("STUDENTS")
@Controller("students")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post("student")
  async create(
    @Body() createStudentDto: CreateStudentDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.studentsService.create(createStudentDto, res);
  }

  @Post("find/student")
  findAll(@Body() findStudentsDto: findStudentsDto) {
    return this.studentsService.findAll(findStudentsDto);
  }

  @Post("login")
  login(
    @Body() loginStudentsDto: LoginStudentDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.studentsService.login(loginStudentsDto, res);
  }

  @Get()
  async getAllStudents(
    @Query("page") page: number,
    @Query("limit") limit: number
  ): Promise<{ students: Students[]; total: number }> {
    return this.studentsService.getAllStudents(page, limit);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Students | null> {
    return this.studentsService.findByPhoneNumber(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateStudentDto: UpdateStudentDto
  ) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.studentsService.remove(id);
  }

  @Post("signout")
  logout(
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.studentsService.logout(refresh_token, res);
  }
}
