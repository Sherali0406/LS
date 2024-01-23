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
exports.DirectorsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const director_model_1 = require("./model/director.model");
let DirectorsService = exports.DirectorsService = class DirectorsService {
    constructor(directorsRepo) {
        this.directorsRepo = directorsRepo;
    }
    async create(createDirectorDto) {
        try {
            const exist = await this.directorsRepo.findOne({
                where: { first_name: createDirectorDto.first_name },
            });
            if (exist) {
                throw new common_1.BadRequestException("This Director is already exist");
            }
            const director = await this.directorsRepo.create(createDirectorDto);
            return director;
        }
        catch (error) {
            throw new common_1.BadRequestException("Bad request");
        }
    }
    async findDirectorById(id) {
        const director = await this.directorsRepo.findOne({
            where: { id },
            include: { all: true },
        });
        return director;
    }
    async update(id, updateDirectorDto) {
        const [_, [updatedDirector]] = await this.directorsRepo.update(updateDirectorDto, {
            where: { id },
            returning: true,
        });
        if (!updatedDirector) {
            throw new common_1.BadRequestException("Director not found or not updated");
        }
        return updatedDirector;
    }
    async getAllDirectors(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const directors = await this.directorsRepo.findAll({
            limit,
            offset,
            include: { all: true },
        });
        const total = await this.directorsRepo.count();
        return { directors, total };
    }
    async remove(id) {
        if (!id) {
            throw new common_1.BadRequestException("Invalid ID");
        }
        const director = await this.directorsRepo.findOne({ where: { id } });
        if (!director) {
            throw new common_1.HttpException("Director is not found by the given ID", common_1.HttpStatus.NO_CONTENT);
        }
        await director.destroy();
        return { message: "Deleted successfully" };
    }
};
exports.DirectorsService = DirectorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(director_model_1.Director)),
    __metadata("design:paramtypes", [Object])
], DirectorsService);
//# sourceMappingURL=director.service.js.map