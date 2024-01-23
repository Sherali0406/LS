import { LoginTeacherDto } from './dto/login-teacher-dto';
import { TeachersService } from "./teachers.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { Teachers } from "./model/teacher.model";
import { FindTeacherDto } from "./dto/find-teacher-dto";
import { Response } from "express";
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
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
    login(loginTeacherDto: LoginTeacherDto, res: Response): Promise<{
        message: string;
        teacher: Teachers;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    findAll(findTeachersDto: FindTeacherDto): Promise<Teachers[]>;
    findByTeacherId(id: string): Promise<Teachers>;
    getAllTeachers(page: number, limit: number): Promise<{
        teachers: Teachers[];
        total: number;
    }>;
    update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<Teachers>;
    remove(id: string): Promise<{
        message: string;
    }>;
    logout(refresh_token: string, res: Response): Promise<{
        message: string;
        teacher: Teachers;
    }>;
}
