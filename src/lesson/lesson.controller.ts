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
import { LessonService } from "./lesson.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { ApiTags } from "@nestjs/swagger";
import { Lesson } from "./model/lesson.model";

@ApiTags("Lesson")
@Controller("lesson")
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.generateLesson(createLessonDto);
  }

  @Get()
  async getAllLessons(
    @Query("page") page: number,
    @Query("limit") limit: number
  ): Promise<{ lessons: Lesson[]; total: number }> {
    return this.lessonService.getAllLessons(page, limit);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Lesson> {
    return this.lessonService.findLessonById(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateLessonDto: UpdateLessonDto
  ) {
    return this.lessonService.update(+id, updateLessonDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.lessonService.remove(+id);
  }
}
