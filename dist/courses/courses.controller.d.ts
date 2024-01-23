import { findCourseDto } from './dto/find-course-dto';
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Courses } from "./model/course.model";
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto): Promise<Courses>;
    getAllCourses(page: number, limit: number): Promise<{
        courses: Courses[];
        total: number;
    }>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<Courses>;
    findOne(id: string): Promise<Courses>;
    findAll(findCourseDto: findCourseDto): Promise<{
        courses: Courses[];
        total: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
