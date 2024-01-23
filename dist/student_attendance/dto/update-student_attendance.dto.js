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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudentAttendanceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateStudentAttendanceDto {
}
exports.UpdateStudentAttendanceDto = UpdateStudentAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        example: true,
        description: "Attendance participation status",
    }),
    __metadata("design:type", Boolean)
], UpdateStudentAttendanceDto.prototype, "participated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: "2023-11-06",
        description: "Attendance date",
    }),
    __metadata("design:type", String)
], UpdateStudentAttendanceDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1, description: "Group ID" }),
    __metadata("design:type", Number)
], UpdateStudentAttendanceDto.prototype, "group_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1, description: "Lesson ID" }),
    __metadata("design:type", Number)
], UpdateStudentAttendanceDto.prototype, "lesson_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1, description: "Student ID" }),
    __metadata("design:type", Number)
], UpdateStudentAttendanceDto.prototype, "student_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: "Optional comment",
        description: "Optional comment",
    }),
    __metadata("design:type", String)
], UpdateStudentAttendanceDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1, description: "Admin ID" }),
    __metadata("design:type", Number)
], UpdateStudentAttendanceDto.prototype, "admin_id", void 0);
//# sourceMappingURL=update-student_attendance.dto.js.map