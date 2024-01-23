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
exports.CreateStudentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateStudentDto {
}
exports.CreateStudentDto = CreateStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The name of the student",
        example: "John",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The surname of the student",
        example: "Doe",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The phone number of the student",
        example: "+998999765302",
    }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The password of the student",
        example: "+998999765302",
    }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The confirm password of the student",
        example: "+998999765302",
    }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "confirm_password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Courses the student is enrolled in",
        example: "Math, Physics",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "courses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Groups the student belongs to",
        example: "A, B",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "groups", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Status of the student",
        example: "Active",
        enum: ["Active", "Inactive"],
    }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "status", void 0);
//# sourceMappingURL=create-student.dto.js.map