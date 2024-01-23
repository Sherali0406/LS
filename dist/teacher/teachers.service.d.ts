import { JwtService } from "@nestjs/jwt";
import { FindTeacherDto } from "./dto/find-teacher-dto";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { Teachers } from "./model/teacher.model";
import { Response } from "express";
import { LoginTeacherDto } from "./dto/login-teacher-dto";
export declare class TeachersService {
    private teachersRepo;
    private readonly jwtService;
    constructor(teachersRepo: typeof Teachers, jwtService: JwtService);
    create(createTeacherDto: CreateTeacherDto, res: Response): Promise<{
        message: string;
        teacher: {
            id: number;
            name: string;
            surname: string;
            image: string;
            course: string;
            hashed_password: string;
            active_groups: string;
            status: string;
            createdAt: any;
            updatedAt: any;
        };
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    getTokens(teachers: Teachers): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(loginTeacherDto: LoginTeacherDto, res: Response): Promise<{
        message: string;
        teacher: Teachers;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    findByTeacherId(id: number): Promise<Teachers>;
    update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<Teachers>;
    findAll(FindTeacherDto: FindTeacherDto): Promise<Teachers[]>;
    getAllTeachers(page?: number, limit?: number): Promise<{
        teachers: Teachers[];
        total: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    logout(refresh_token: string, res: Response): Promise<{
        message: string;
        teacher: Teachers;
    }>;
}
