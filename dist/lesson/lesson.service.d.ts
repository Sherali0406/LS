import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { Lesson } from "./model/lesson.model";
export declare class LessonService {
    private lessonRepo;
    constructor(lessonRepo: typeof Lesson);
    generateLesson(createLessonDto: CreateLessonDto): Promise<Lesson>;
    findLessonById(id: number): Promise<Lesson>;
    update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson>;
    getAllLessons(page?: number, limit?: number): Promise<{
        lessons: Lesson[];
        total: number;
    }>;
    remove(id: number): Promise<number>;
}
