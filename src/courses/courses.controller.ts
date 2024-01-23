import { findCourseDto } from './dto/find-course-dto';
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
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Courses } from "./model/course.model";

@ApiTags("COURSES")
@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  getAllCourses(
    @Query("page") page: number,
    @Query("limit") limit: number
  ): Promise<{courses:Courses[];total:number}> {
    return this.coursesService.getAllCourses(page,limit);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    return this.coursesService.update(+id, updateCourseDto);
  }
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Courses> {
    return this.coursesService.findCourseById(+id);
  }

  @Post("find")
  findAll(@Body() findCourseDto: findCourseDto) {
    return this.coursesService.findAll(findCourseDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.coursesService.remove(id);
  }
}
