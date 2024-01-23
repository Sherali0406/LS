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
exports.LessonService = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const lesson_model_1 = require("./model/lesson.model");
const common_1 = require("@nestjs/common");
let LessonService = exports.LessonService = class LessonService {
    constructor(lessonRepo) {
        this.lessonRepo = lessonRepo;
    }
    async generateLesson(createLessonDto) {
        try {
            const exist = await this.lessonRepo.findOne({
                where: { title: createLessonDto.title },
            });
            if (exist) {
                throw new common_1.BadRequestException("This lesson is already exist");
            }
            const lesson = await this.lessonRepo.create(createLessonDto);
            return lesson;
        }
        catch (error) {
            console.error("Validation Error:", error.errors);
            throw new common_1.BadRequestException("Validation failed: " + JSON.stringify(error));
        }
    }
    async findLessonById(id) {
        const lesson = await this.lessonRepo.findOne({
            where: { id },
            include: { all: true },
        });
        return lesson;
    }
    async update(id, updateLessonDto) {
        const [_, [updatedLesson]] = await this.lessonRepo.update(updateLessonDto, {
            where: { id },
            returning: true,
        });
        if (!updatedLesson) {
            throw new common_1.BadRequestException("Lesson not found or not updated");
        }
        return updatedLesson;
    }
    async getAllLessons(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const lessons = await this.lessonRepo.findAll({
            limit,
            offset,
            include: { all: true },
        });
        const total = await this.lessonRepo.count();
        return { lessons, total };
    }
    async remove(id) {
        const del = this.lessonRepo.destroy({ where: { id } });
        return del;
    }
};
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(lesson_model_1.Lesson)),
    __metadata("design:paramtypes", [Object])
], LessonService);
//# sourceMappingURL=lesson.service.js.map