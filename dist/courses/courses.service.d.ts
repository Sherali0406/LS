import { findCourseDto } from './dto/find-course-dto';
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Courses } from "./model/course.model";
export declare class CoursesService {
    private coursesRepo;
    constructor(coursesRepo: typeof Courses);
    create(createCourseDto: CreateCourseDto): Promise<Courses>;
    findCourseById(id: number): Promise<Courses>;
    update(id: number, updateCourseDto: UpdateCourseDto): Promise<Courses>;
    findAll(findCourseDto: findCourseDto, page?: number, limit?: number): Promise<{
        courses: Courses[];
        total: number;
    }>;
    getAllCourses(page?: number, limit?: number): Promise<{
        courses: Courses[];
        total: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
