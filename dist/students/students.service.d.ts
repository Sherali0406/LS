import { JwtService } from "@nestjs/jwt";
import { CreateStudentDto } from "./dto/create-student.dto";
import { Students } from "./model/student.model";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { findStudentsDto } from "./dto/find-student-dto";
import { LoginStudentDto } from "./dto/login-student-dto";
import { Response } from "express";
export declare class StudentsService {
    private studentsRepo;
    private readonly jwtService;
    constructor(studentsRepo: typeof Students, jwtService: JwtService);
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
    getTokens(students: Students): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(loginStudentDto: LoginStudentDto, res: Response): Promise<{
        message: string;
        student: Students;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    findByPhoneNumber(id: string): Promise<Students | null>;
    update(id: number, updateStudentDto: UpdateStudentDto): Promise<Students>;
    findAll(findStudentsDto: findStudentsDto, page?: number, limit?: number): Promise<{
        students: Students[];
        total: number;
    }>;
    getAllStudents(page?: number, limit?: number): Promise<{
        students: Students[];
        total: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    logout(refresh_token: string, res: Response): Promise<{
        message: string;
        student: Students;
    }>;
}
