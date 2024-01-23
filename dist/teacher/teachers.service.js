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
exports.TeachersService = void 0;
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("sequelize");
const common_1 = require("@nestjs/common");
const sequelize_2 = require("@nestjs/sequelize");
const teacher_model_1 = require("./model/teacher.model");
const bcrypt = require("bcrypt");
let TeachersService = exports.TeachersService = class TeachersService {
    constructor(teachersRepo, jwtService) {
        this.teachersRepo = teachersRepo;
        this.jwtService = jwtService;
    }
    async create(createTeacherDto, res) {
        try {
            const teacher = await this.teachersRepo.findOne({
                where: { phone_number: createTeacherDto.phone_number },
            });
            if (teacher) {
                throw new common_1.BadRequestException("This phone number is already registered");
            }
            if (createTeacherDto.password !== createTeacherDto.confirm_password) {
                throw new common_1.BadRequestException("Passwords did not match!");
            }
            const hashed_password = await bcrypt.hash(createTeacherDto.password, 7);
            const newTeacher = await this.teachersRepo.create({
                ...createTeacherDto,
                role: "teacher",
                hashed_password: hashed_password,
            });
            const tokens = await this.getTokens(newTeacher);
            const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
            const updatedTeacher = await this.teachersRepo.update({ hashed_refresh_token }, {
                where: { id: newTeacher.id },
                returning: true,
            });
            res.cookie("refresh_token", tokens.refresh_token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            const response = {
                message: "Teacher registered",
                teacher: {
                    id: newTeacher.id,
                    name: newTeacher.name,
                    surname: newTeacher.surname,
                    image: newTeacher.image,
                    course: newTeacher.course,
                    hashed_password: newTeacher.hashed_password,
                    active_groups: newTeacher.active_groups,
                    status: newTeacher.status,
                    createdAt: newTeacher.createdAt,
                    updatedAt: newTeacher.updatedAt,
                },
                tokens,
            };
            return response;
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to create a teacher: " + error.message);
        }
    }
    async getTokens(teachers) {
        const jwtPayload = {
            id: teachers.id,
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
    async login(loginTeacherDto, res) {
        const { phone_number, password } = loginTeacherDto;
        const teacher = await this.teachersRepo.findOne({
            where: { phone_number },
        });
        if (!teacher) {
            throw new common_1.BadRequestException("Teacher did not register!");
        }
        const isMatchPass = await bcrypt.compare(password, teacher.hashed_password);
        if (!isMatchPass) {
            throw new common_1.BadRequestException("Teacher did not register(pass)!");
        }
        const tokens = await this.getTokens(teacher);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
        const updateTeacher = await this.teachersRepo.update({ hashed_refresh_token: hashed_refresh_token }, { where: { id: teacher.id }, returning: true });
        res.cookie("refresh_token", tokens.refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        const response = {
            message: "Teacher logged in",
            teacher: updateTeacher[1][0],
            tokens,
        };
        return response;
    }
    async findByTeacherId(id) {
        return this.teachersRepo.findOne({
            where: { id, role: "teacher" },
            include: { all: true },
        });
    }
    async update(id, updateTeacherDto) {
        const teachers = await this.teachersRepo.update(updateTeacherDto, {
            where: { id },
            returning: true,
        });
        return teachers[1][0].dataValues;
    }
    async findAll(FindTeacherDto) {
        const where = {};
        if (FindTeacherDto.phone_number) {
            where["phone_number"] = {
                [sequelize_1.Op.like]: `%${FindTeacherDto.phone_number}%`,
            };
            console.log("found");
        }
        const teachers = await teacher_model_1.Teachers.findAll({ where });
        if (!teachers) {
            throw new common_1.BadRequestException("teacher is not found");
        }
        return teachers;
    }
    async getAllTeachers(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const teachers = await this.teachersRepo.findAll({
            limit,
            offset,
            include: { all: true },
        });
        const total = await this.teachersRepo.count();
        return { teachers, total };
    }
    async remove(id) {
        if (!id) {
            throw new common_1.BadRequestException("Invalid ID");
        }
        const teacher = await this.teachersRepo.findOne({ where: { id } });
        if (!teacher) {
            throw new common_1.BadRequestException("Teacher is not found by the given ID");
        }
        await teacher.destroy();
        return { message: "Deleted successfully" };
    }
    async logout(refresh_token, res) {
        const teacherData = await this.jwtService.verify(refresh_token, {
            secret: process.env.REFRESH_TOKEN_KEY_AD,
        });
        if (!teacherData) {
            throw new common_1.ForbiddenException("teacher not found");
        }
        const updateTeacher = await this.teachersRepo.update({ hashed_refresh_token: null }, { where: { id: teacherData.id }, returning: true });
        res.clearCookie("refresh_token");
        const response = {
            message: "Teacher logged out successfully",
            teacher: updateTeacher[1][0],
        };
        return response;
    }
};
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_2.InjectModel)(teacher_model_1.Teachers)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map