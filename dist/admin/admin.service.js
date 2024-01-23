"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
const admin_model_1 = require("./model/admin.model");
let AdminService = exports.AdminService = class AdminService {
    constructor(adminRepo, jwtService) {
        this.adminRepo = adminRepo;
        this.jwtService = jwtService;
    }
    async registration(CreateAdminDto, res) {
        const admin = await this.adminRepo.findOne({
            where: { first_name: CreateAdminDto.first_name },
        });
        if (admin) {
            throw new common_1.BadRequestException("Admin name already exists!");
        }
        if (CreateAdminDto.password !== CreateAdminDto.confirm_password) {
            throw new common_1.BadRequestException("Passwords is not match!");
        }
        const hashed_password = await bcrypt.hash(CreateAdminDto.password, 7);
        const newAdmin = await this.adminRepo.create({
            ...CreateAdminDto,
            hashed_password: hashed_password,
        });
        const tokens = await this.getTokens(newAdmin);
        const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
        const uniqueKey = (0, uuid_1.v4)();
        const updateAdmin = await this.adminRepo.update({
            hashed_refresh_token: hashed_password_token,
            activation_link: uniqueKey,
        }, {
            where: { id: newAdmin.id },
            returning: true,
        });
        res.cookie("refresh_token", tokens.refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        const response = {
            message: "Admin registred",
            admin: updateAdmin[1][0],
            tokens,
        };
        return response;
    }
    async getTokens(admin) {
        const jwtPayload = {
            id: admin.id,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.ACCESS_TOKEN_KEY_AD,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.REFRESH_TOKEN_KEY_AD,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async login(loginAdminDto, res) {
        const { phone_number, password } = loginAdminDto;
        const admin = await this.adminRepo.findOne({ where: { phone_number } });
        if (!admin) {
            throw new common_1.BadRequestException("Admin did not register!");
        }
        const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
        if (!isMatchPass) {
            throw new common_1.BadRequestException("Admin did not register(pass)!");
        }
        const tokens = await this.getTokens(admin);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
        const updateAdmin = await this.adminRepo.update({ hashed_refresh_token: hashed_refresh_token }, { where: { id: admin.id }, returning: true });
        res.cookie("refresh_token", tokens.refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        const response = {
            message: "Admin logged in",
            admin: updateAdmin[1][0],
            tokens,
        };
        return response;
    }
    async logout(refresh_token, res) {
        const adminData = await this.jwtService.verify(refresh_token, {
            secret: process.env.REFRESH_TOKEN_KEY_AD,
        });
        if (!adminData) {
            throw new common_1.ForbiddenException("admin not found");
        }
        const updateAdmin = await this.adminRepo.update({ hashed_refresh_token: null }, { where: { id: adminData.id }, returning: true });
        res.clearCookie("refresh_token");
        const response = {
            message: "Admin logged out successfully",
            admin: updateAdmin[1][0],
        };
        return response;
    }
    async refreshToken(admin_id, refreshToken, res) {
        const decodedToken = this.jwtService.decode(refreshToken);
        if (admin_id != decodedToken["id"]) {
            throw new common_1.BadRequestException("admin not found");
        }
        const admin = await this.adminRepo.findOne({ where: { id: admin_id } });
        if (!admin || !admin.hashed_refresh_token) {
            throw new common_1.BadRequestException("admin not found");
        }
        const tokenMatch = await bcrypt.compare(refreshToken, admin.hashed_refresh_token);
        if (!tokenMatch) {
            throw new common_1.ForbiddenException("Forbidden!!!!!");
        }
        const tokens = await this.getTokens(admin);
        const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
        const updateAdmin = await this.adminRepo.update({
            hashed_refresh_token: hashed_password_token,
        }, {
            where: { id: admin.id },
            returning: true,
        });
        res.cookie("refresh_token", tokens.refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        const response = {
            message: "Admin",
            admin: updateAdmin[1][0],
            tokens,
        };
        return response;
    }
    async getAllAdmins(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const admin = await this.adminRepo.findAll({
            limit,
            offset,
            include: { all: true },
        });
        const total = await this.adminRepo.count();
        return { admin, total };
    }
    async remove(id) {
        if (!id) {
            throw new common_1.BadRequestException("Invalid ID");
        }
        const student = await this.adminRepo.findOne({ where: { id } });
        if (!student) {
            throw new common_1.BadRequestException("Student is not found by the given ID");
        }
        await student.destroy();
        return { message: "Deleted successfully" };
    }
    async findOne(id) {
        const admin = await this.adminRepo.findOne({
            where: { id },
            include: { all: true },
        });
        return admin;
    }
    async update(id, UpdateAdminDto) {
        const admins = await this.adminRepo.update(UpdateAdminDto, {
            where: { id },
            returning: true,
        });
        return admins[1][0].dataValues;
    }
    async findAll(findAdminDto, page = 1, limit = 10) {
        const where = { phone_number: findAdminDto.phone_number };
        const offset = (page - 1) * limit;
        const admin = await this.adminRepo.findAll({
            where,
            limit,
            offset,
        });
        const total = await this.adminRepo.count({ where });
        if (!admin || admin.length === 0) {
            throw new common_1.BadRequestException("Student not found");
        }
        return { admin, total };
    }
    async deleteAdmin(id) {
        if (!id) {
            throw new common_1.BadRequestException("Invalid ID");
        }
        const admin = await this.adminRepo.findOne({ where: { id } });
        if (!admin) {
            throw new common_1.BadRequestException("Admin is not found by the given ID");
        }
        await admin.destroy();
        return { message: "Admin deleted" };
    }
};
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(admin_model_1.Admin)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map