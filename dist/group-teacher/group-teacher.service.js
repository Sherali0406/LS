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
exports.GroupTeachersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const group_teacher_model_1 = require("./model/group-teacher.model");
let GroupTeachersService = exports.GroupTeachersService = class GroupTeachersService {
    constructor(groupTeachersRepo) {
        this.groupTeachersRepo = groupTeachersRepo;
    }
    async create(createGroupTeacherDto) {
        const groupTeachers = await this.groupTeachersRepo.create(createGroupTeacherDto);
        return groupTeachers;
    }
    async findOne(id) {
        const groupTeachers = await this.groupTeachersRepo.findOne({
            where: { id },
            include: { all: true },
        });
        return groupTeachers;
    }
    async update(id, updateGroupTeacherDto) {
        const groupTeachers = await this.groupTeachersRepo.update(updateGroupTeacherDto, {
            where: { id },
            returning: true,
        });
        return groupTeachers[1][0].dataValues;
    }
    async getAllGroupTeachers() {
        const groupTeachers = await this.groupTeachersRepo.findAll({
            include: { all: true },
        });
        return groupTeachers;
    }
    async remove(id) {
        const del = this.groupTeachersRepo.destroy({ where: { id } });
        return del;
    }
};
exports.GroupTeachersService = GroupTeachersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(group_teacher_model_1.GroupTeacher)),
    __metadata("design:paramtypes", [Object])
], GroupTeachersService);
//# sourceMappingURL=group-teacher.service.js.map