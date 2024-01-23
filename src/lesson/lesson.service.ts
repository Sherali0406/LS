import { InjectModel } from "@nestjs/sequelize";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { Lesson } from "./model/lesson.model";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class LessonService {
  constructor(@InjectModel(Lesson) private lessonRepo: typeof Lesson) {}

  async generateLesson(createLessonDto: CreateLessonDto) {
    try {
      const exist = await this.lessonRepo.findOne({
        where: { title: createLessonDto.title },
      });
      if (exist) {
        throw new BadRequestException("This lesson is already exist");
      }
      const lesson = await this.lessonRepo.create(createLessonDto);
      return lesson;
    } catch (error) {
      console.error("Validation Error:", error.errors);
      throw new BadRequestException(
        "Validation failed: " + JSON.stringify(error)
      );
    }
  }

  async findLessonById(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const [_, [updatedLesson]] = await this.lessonRepo.update(updateLessonDto, {
      where: { id },
      returning: true,
    });

    if (!updatedLesson) {
      throw new BadRequestException("Lesson not found or not updated");
    }

    return updatedLesson;
  }

  async getAllLessons(
    page: number = 1,
    limit: number = 10
  ): Promise<{ lessons: Lesson[]; total: number }> {
    const offset = (page - 1) * limit;

    const lessons = await this.lessonRepo.findAll({
      limit,
      offset,
      include: { all: true },
    });

    const total = await this.lessonRepo.count();

    return { lessons, total };
  }

  async remove(id: number) {
    const del = this.lessonRepo.destroy({ where: { id } });
    return del;
  }
}
