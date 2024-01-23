import { UpdateAdminDto } from "./dto/update-admin.dto";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { Admin } from "./model/admin.model";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { findAdminDto } from "./dto/find-admin.dto";
export declare class AdminService {
    private readonly adminRepo;
    private readonly jwtService;
    constructor(adminRepo: typeof Admin, jwtService: JwtService);
    registration(CreateAdminDto: CreateAdminDto, res: Response): Promise<{
        message: string;
        admin: Admin;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    getTokens(admin: Admin): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    login(loginAdminDto: LoginAdminDto, res: Response): Promise<{
        message: string;
        admin: Admin;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    logout(refresh_token: string, res: Response): Promise<{
        message: string;
        admin: Admin;
    }>;
    refreshToken(admin_id: number, refreshToken: string, res: Response): Promise<{
        message: string;
        admin: Admin;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    getAllAdmins(page?: number, limit?: number): Promise<{
        admin: Admin[];
        total: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findOne(id: number): Promise<Admin>;
    update(id: number, UpdateAdminDto: UpdateAdminDto): Promise<Admin>;
    findAll(findAdminDto: findAdminDto, page?: number, limit?: number): Promise<{
        admin: Admin[];
        total: number;
    }>;
    deleteAdmin(id: number): Promise<{
        message: string;
    }>;
}
