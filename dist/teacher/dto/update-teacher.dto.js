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
exports.UpdateTeacherDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_teacher_dto_1 = require("./create-teacher.dto");
class UpdateTeacherDto extends (0, swagger_1.PartialType)(create_teacher_dto_1.CreateTeacherDto) {
}
exports.UpdateTeacherDto = UpdateTeacherDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The name of the teacher",
        example: "Alice",
    }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The surname of the teacher",
        example: "Smith",
    }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "role of user",
        example: "teacher",
    }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The phone number of the teacher",
        example: "+1234567890",
    }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The passowrd of the teacher",
        example: "+998999765302",
    }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The confirm passowrd of the teacher",
        example: "+998999765302",
    }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "confirm_password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "URL of the teacher's image",
        example: "https://example.com/teacher-image.jpg",
    }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The course the teacher is assigned to",
        example: "Computer Science",
    }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Active groups the teacher is assigned to",
        example: "A, B",
    }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "active_groups", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Status of the teacher",
        example: "Active",
    }),
    __metadata("design:type", String)
], UpdateTeacherDto.prototype, "status", void 0);
//# sourceMappingURL=update-teacher.dto.js.map