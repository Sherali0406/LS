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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const course_model_1 = require("./model/course.model");
let CoursesService = exports.CoursesService = class CoursesService {
    constructor(coursesRepo) {
        this.coursesRepo = coursesRepo;
    }
    async create(createCourseDto) {
        try {
            const exist = await this.coursesRepo.findOne({
                where: { name: createCourseDto.name },
            });
            if (exist) {
                throw new common_1.BadRequestException("This Course is already exist");
            }
            const course = await this.coursesRepo.create(createCourseDto);
            return course;
        }
        catch (error) {
            throw new common_1.BadRequestException("Bad request");
        }
    }
    async findCourseById(id) {
        const course = await this.coursesRepo.findOne({
            where: { id },
            include: { all: true },
        });
        return course;
    }
    async update(id, updateCourseDto) {
        const [_, [updatedCourse]] = await this.coursesRepo.update(updateCourseDto, {
            where: { id },
            returning: true,
        });
        if (!updatedCourse) {
            throw new common_1.BadRequestException("Course not found or not updated");
        }
        return updatedCourse;
    }
    async findAll(findCourseDto, page = 1, limit = 10) {
        const where = { name: findCourseDto.name };
        const offset = (page - 1) * limit;
        const courses = await this.coursesRepo.findAll({
            where,
            limit,
            offset,
        });
        const total = await this.coursesRepo.count({ where });
        if (!courses || courses.length === 0) {
            throw new common_1.BadRequestException("course did not found");
        }
        return { courses, total };
    }
    async getAllCourses(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const courses = await this.coursesRepo.findAll({
            limit,
            offset,
            include: { all: true },
        });
        const total = await this.coursesRepo.count();
        return { courses, total };
    }
    async remove(id) {
        if (!id) {
            throw new common_1.BadRequestException("Invalid ID");
        }
        const course = await this.coursesRepo.findOne({ where: { id } });
        if (!course) {
            throw new common_1.HttpException("Course is not found by the given ID", common_1.HttpStatus.NO_CONTENT);
        }
        await course.destroy();
        return { message: "Deleted successfully" };
    }
};
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(course_model_1.Courses)),
    __metadata("design:paramtypes", [Object])
], CoursesService);
//# sourceMappingURL=courses.service.js.map