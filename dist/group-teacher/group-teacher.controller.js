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
exports.GroupTeachersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_group_teacher_dto_1 = require("./dto/create-group-teacher.dto");
const update_group_teacher_dto_1 = require("./dto/update-group-teacher.dto");
const group_teacher_service_1 = require("./group-teacher.service");
let GroupTeachersController = exports.GroupTeachersController = class GroupTeachersController {
    constructor(groupTeachersService) {
        this.groupTeachersService = groupTeachersService;
    }
    async create(createGroupTeacherDto) {
        return this.groupTeachersService.create(createGroupTeacherDto);
    }
    async findOne(id) {
        return this.groupTeachersService.findOne(+id);
    }
    getAllGroupTeachers() {
        return this.groupTeachersService.getAllGroupTeachers();
    }
    async update(id, updateGroupTeacherDto) {
        return this.groupTeachersService.update(+id, updateGroupTeacherDto);
    }
    async remove(id) {
        return this.groupTeachersService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_teacher_dto_1.CreateGroupTeacherDto]),
    __metadata("design:returntype", Promise)
], GroupTeachersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupTeachersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GroupTeachersController.prototype, "getAllGroupTeachers", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_group_teacher_dto_1.UpdateGroupTeacherDto]),
    __metadata("design:returntype", Promise)
], GroupTeachersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupTeachersController.prototype, "remove", null);
exports.GroupTeachersController = GroupTeachersController = __decorate([
    (0, swagger_1.ApiTags)("Group teacher"),
    (0, common_1.Controller)("groupTeachers"),
    __metadata("design:paramtypes", [group_teacher_service_1.GroupTeachersService])
], GroupTeachersController);
//# sourceMappingURL=group-teacher.controller.js.map