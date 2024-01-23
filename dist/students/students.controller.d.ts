import { LoginStudentDto } from "./dto/login-student-dto";
import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Students } from "./model/student.model";
import { findStudentsDto } from "./dto/find-student-dto";
import { Response } from "express";
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(createStudentDto: CreateStudentDto, res: Response): Promise<{
        message: string;
        student: {
            id: number;
            name: string;
            surname: string;
            phone_number: string;
            hashed_password: string;
            courses: string;
            groups: string;
            status: string;
        };
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    findAll(findStudentsDto: findStudentsDto): Promise<{
        students: Students[];
        total: number;
    }>;
    login(loginStudentsDto: LoginStudentDto, res: Response): Promise<{
        message: string;
        student: Students;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    getAllStudents(page: number, limit: number): Promise<{
        students: Students[];
        total: number;
    }>;
    findOne(id: string): Promise<Students | null>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<Students>;
    remove(id: string): Promise<{
        message: string;
    }>;
    logout(refresh_token: string, res: Response): Promise<{
        message: string;
        student: Students;
    }>;
}
