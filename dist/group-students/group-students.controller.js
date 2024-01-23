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
exports.GroupStudentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_group_student_dto_1 = require("./dto/create-group-student.dto");
const update_group_student_dto_1 = require("./dto/update-group-student.dto");
const group_students_service_1 = require("./group-students.service");
let GroupStudentsController = exports.GroupStudentsController = class GroupStudentsController {
    constructor(groupStudentsService) {
        this.groupStudentsService = groupStudentsService;
    }
    async create(createGroupStudentDto) {
        return this.groupStudentsService.create(createGroupStudentDto);
    }
    async getAllGroupStudents(page, limit) {
        return this.groupStudentsService.getAllGroupStudents(page, limit);
    }
    async findOne(id) {
        return this.groupStudentsService.findGroup_studentById(+id);
    }
    async update(id, updateGroupStudentsDto) {
        return this.groupStudentsService.update(+id, updateGroupStudentsDto);
    }
    async remove(id) {
        return this.groupStudentsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_student_dto_1.CreateGroupStudentsDto]),
    __metadata("design:returntype", Promise)
], GroupStudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GroupStudentsController.prototype, "getAllGroupStudents", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupStudentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_group_student_dto_1.UpdateGroupStudentsDto]),
    __metadata("design:returntype", Promise)
], GroupStudentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupStudentsController.prototype, "remove", null);
exports.GroupStudentsController = GroupStudentsController = __decorate([
    (0, swagger_1.ApiTags)("GROUP_STUDENTS"),
    (0, common_1.Controller)("groupStudents"),
    __metadata("design:paramtypes", [group_students_service_1.GroupStudentsService])
], GroupStudentsController);
//# sourceMappingURL=group-students.controller.js.map