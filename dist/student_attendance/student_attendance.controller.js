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
exports.StudentAttendanceController = void 0;
const common_1 = require("@nestjs/common");
const student_attendance_service_1 = require("./student_attendance.service");
const create_student_attendance_dto_1 = require("./dto/create-student_attendance.dto");
const update_student_attendance_dto_1 = require("./dto/update-student_attendance.dto");
const swagger_1 = require("@nestjs/swagger");
let StudentAttendanceController = exports.StudentAttendanceController = class StudentAttendanceController {
    constructor(studentAttendanceService) {
        this.studentAttendanceService = studentAttendanceService;
    }
    async create(createStudentAttendanceDto) {
        return this.studentAttendanceService.create(createStudentAttendanceDto);
    }
    findAll() {
        return this.studentAttendanceService.findAll();
    }
    findOne(id) {
        return this.studentAttendanceService.findOne(+id);
    }
    update(id, updateStudentAttendanceDto) {
        return this.studentAttendanceService.update(+id, updateStudentAttendanceDto);
    }
    remove(id) {
        return this.studentAttendanceService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_attendance_dto_1.CreateStudentAttendanceDto]),
    __metadata("design:returntype", Promise)
], StudentAttendanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentAttendanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentAttendanceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_student_attendance_dto_1.UpdateStudentAttendanceDto]),
    __metadata("design:returntype", void 0)
], StudentAttendanceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentAttendanceController.prototype, "remove", null);
exports.StudentAttendanceController = StudentAttendanceController = __decorate([
    (0, swagger_1.ApiTags)("student_attendance"),
    (0, common_1.Controller)('student-attendance'),
    __metadata("design:paramtypes", [student_attendance_service_1.StudentAttendanceService])
], StudentAttendanceController);
//# sourceMappingURL=student_attendance.controller.js.map