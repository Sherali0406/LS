import { LessonService } from "./lesson.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { Lesson } from "./model/lesson.model";
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    create(createLessonDto: CreateLessonDto): Promise<Lesson>;
    getAllLessons(page: number, limit: number): Promise<{
        lessons: Lesson[];
        total: number;
    }>;
    findOne(id: string): Promise<Lesson>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson>;
    remove(id: string): Promise<number>;
}
