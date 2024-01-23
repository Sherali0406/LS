import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./model/admin.model";
import { Response } from "express";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { findAdminDto } from "./dto/find-admin.dto";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    registration(createAdminDto: CreateAdminDto, res: Response): Promise<{
        message: string;
        admin: Admin;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
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
    refresh(id: string, refreshToken: string, res: Response): Promise<{
        message: string;
        admin: Admin;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    findAll(findUserDto: findAdminDto): Promise<{
        admin: Admin[];
        total: number;
    }>;
    findOne(id: string): Promise<Admin>;
    getAllAdmins(page: number, limit: number): Promise<{
        admin: Admin[];
        total: number;
    }>;
    deleteAdmin(id: number): Promise<{
        message: string;
    }>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin>;
}
