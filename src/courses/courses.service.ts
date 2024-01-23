import { findCourseDto } from './dto/find-course-dto';
// src/courses/courses.service.ts
import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Courses } from "./model/course.model";
import * as bcrypt from "bcrypt";


@Injectable()
export class CoursesService {
  constructor(@InjectModel(Courses) private coursesRepo: typeof Courses) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const exist = await this.coursesRepo.findOne({
        where: { name: createCourseDto.name },
      });
      if (exist) {
        throw new BadRequestException("This Course is already exist");
      }
      const course = await this.coursesRepo.create(createCourseDto);
      return course;
    } catch (error) {
      throw new BadRequestException("Bad request");
    }
  }

  async findCourseById(id: number): Promise<Courses> {
    const course=await this.coursesRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return course
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Courses> {
    const [_, [updatedCourse]] = await this.coursesRepo.update(
      updateCourseDto,
      {
        where: { id },
        returning: true, 
      }
    );

    if (!updatedCourse) {
      throw new BadRequestException("Course not found or not updated");
    }

    return updatedCourse;
  } 

  async findAll(
    findCourseDto: findCourseDto, 
    page: number = 1,
    limit: number = 10
  ): Promise<{ courses: Courses[]; total: number }> {
    const where = { name: findCourseDto.name };

    const offset = (page - 1) * limit;

    const courses = await this.coursesRepo.findAll({
      where,
      limit,
      offset,
    });

    const total = await this.coursesRepo.count({ where });

    if (!courses || courses.length === 0) {
      throw new BadRequestException("course did not found");
    }

    return { courses, total };
  }

  async getAllCourses(
    page: number = 1,
    limit: number = 10
  ): Promise<{ courses: Courses[]; total: number }> {
    const offset = (page - 1) * limit;

    const courses = await this.coursesRepo.findAll({
      limit,
      offset,
      include: { all: true },
    });

    const total = await this.coursesRepo.count();

    return { courses, total };
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException("Invalid ID");
    }
    const course = await this.coursesRepo.findOne({ where: { id } });

    if (!course) {
      throw new HttpException(
        "Course is not found by the given ID",
        HttpStatus.NO_CONTENT //(NO_CONTENT) to indicate that the user was not found.
      );
    }

    await course.destroy();

    return { message: "Deleted successfully" };
  }
}
