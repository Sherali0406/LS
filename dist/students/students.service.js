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
exports.StudentsService = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const student_model_1 = require("./model/student.model");
const bcrypt = require("bcrypt");
let StudentsService = exports.StudentsService = class StudentsService {
    constructor(studentsRepo, jwtService) {
        this.studentsRepo = studentsRepo;
        this.jwtService = jwtService;
    }
    async create(createStudentDto, res) {
        try {
            const student = await this.studentsRepo.findOne({
                where: { phone_number: createStudentDto.phone_number },
            });
            if (student) {
                throw new common_1.BadRequestException("This phone number is already registered");
            }
            if (createStudentDto.password !== createStudentDto.confirm_password) {
                throw new common_1.BadRequestException("Passwords did not match!");
            }
            const hashed_password = await bcrypt.hash(createStudentDto.password, 7);
            const newStudent = await this.studentsRepo.create({
                ...createStudentDto,
                role: "student",
                hashed_password: hashed_password,
            });
            const tokens = await this.getTokens(newStudent);
            const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
            const updatedStudent = await this.studentsRepo.update({ hashed_refresh_token }, {
                where: { id: newStudent.id },
                returning: true,
            });
            res.cookie("refresh_token", tokens.refresh_token, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            const response = {
                message: "Student registered",
                student: {
                    id: newStudent.id,
                    name: newStudent.name,
                    surname: newStudent.surname,
                    phone_number: newStudent.phone_number,
                    hashed_password: newStudent.hashed_password,
                    courses: newStudent.courses,
                    groups: newStudent.groups,
                    status: newStudent.status,
                },
                tokens,
            };
            return response;
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to create a student: " + error.message);
        }
    }
    async getTokens(students) {
        const jwtPayload = {
            id: students.id,
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
    async login(loginStudentDto, res) {
        const { phone_number, password } = loginStudentDto;
        const student = await this.studentsRepo.findOne({
            where: { phone_number },
        });
        if (!student) {
            throw new common_1.BadRequestException("Student did not register!");
        }
        const isMatchPass = await bcrypt.compare(password, student.hashed_password);
        if (!isMatchPass) {
            throw new common_1.BadRequestException("Student did not register(pass)!");
        }
        const tokens = await this.getTokens(student);
        const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
        const updateStudent = await this.studentsRepo.update({ hashed_refresh_token: hashed_refresh_token }, { where: { id: student.id }, returning: true });
        res.cookie("refresh_token", tokens.refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        const response = {
            message: "Student logged in",
            student: updateStudent[1][0],
            tokens,
        };
        return response;
    }
    async findByPhoneNumber(id) {
        try {
            const student = await this.studentsRepo.findOne({
                where: { id, role: "student" },
                include: { all: true },
            });
            return student || null;
        }
        catch (error) {
            return null;
        }
    }
    async update(id, updateStudentDto) {
        const [, [updatedStudent]] = await this.studentsRepo.update(updateStudentDto, {
            where: { id },
            returning: true,
        });
        if (!updatedStudent) {
            throw new common_1.BadRequestException("Student not found or not updated");
        }
        return updatedStudent;
    }
    async findAll(findStudentsDto, page = 1, limit = 10) {
        const where = { phone_number: findStudentsDto.phone_number };
        const offset = (page - 1) * limit;
        const students = await this.studentsRepo.findAll({
            where,
            limit,
            offset,
        });
        const total = await this.studentsRepo.count({ where });
        if (!students || students.length === 0) {
            throw new common_1.BadRequestException("Student not found");
        }
        return { students, total };
    }
    async getAllStudents(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const students = await this.studentsRepo.findAll({
            limit,
            offset,
            include: { all: true },
        });
        const total = await this.studentsRepo.count();
        return { students, total };
    }
    async remove(id) {
        if (!id) {
            throw new common_1.BadRequestException("Invalid ID");
        }
        const student = await this.studentsRepo.findOne({ where: { id } });
        if (!student) {
            throw new common_1.BadRequestException("Student is not found by the given ID");
        }
        await student.destroy();
        return { message: "Deleted successfully" };
    }
    async logout(refresh_token, res) {
        const studentData = await this.jwtService.verify(refresh_token, {
            secret: process.env.REFRESH_TOKEN_KEY_AD,
        });
        if (!studentData) {
            throw new common_1.ForbiddenException("student not found");
        }
        const updateStudent = await this.studentsRepo.update({ hashed_refresh_token: null }, { where: { id: studentData.id }, returning: true });
        res.clearCookie("refresh_token");
        const response = {
            message: "Student logged out successfully",
            student: updateStudent[1][0],
        };
        return response;
    }
};
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(student_model_1.Students)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], StudentsService);
//# sourceMappingURL=students.service.js.map