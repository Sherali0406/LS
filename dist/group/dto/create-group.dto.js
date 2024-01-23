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
exports.CreateGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateGroupDto {
}
exports.CreateGroupDto = CreateGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The name of the group",
        example: "Group A",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Start date of the group",
        example: "2023-01-01",
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Days of the week on which the group meets",
        example: "true",
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateGroupDto.prototype, "days", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: "Start_Time at which the group meets with minutes",
        example: "60",
    }),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "start_time", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: "End_Time at which the group meets with minutes",
        example: "100",
    }),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "end_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "id of the room",
        example: 1,
    }),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "room_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Status ",
        example: "true",
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateGroupDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "id of course",
        example: "1",
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "id of teacher",
        example: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "teacher_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "end date of the group",
        example: "2023-02-01",
    }),
    __metadata("design:type", Date)
], CreateGroupDto.prototype, "end_date", void 0);
//# sourceMappingURL=create-group.dto.js.map