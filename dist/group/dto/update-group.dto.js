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
exports.UpdateGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_group_dto_1 = require("./create-group.dto");
class UpdateGroupDto extends (0, swagger_1.PartialType)(create_group_dto_1.CreateGroupDto) {
}
exports.UpdateGroupDto = UpdateGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The name of the group",
        example: "Group A",
    }),
    __metadata("design:type", String)
], UpdateGroupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Start date of the group",
        example: "2023-01-01",
    }),
    __metadata("design:type", String)
], UpdateGroupDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Days of the week on which the group meets",
        example: "true",
    }),
    __metadata("design:type", Boolean)
], UpdateGroupDto.prototype, "days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Start_Time at which the group meets",
        example: "60",
    }),
    __metadata("design:type", Number)
], UpdateGroupDto.prototype, "start_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "End_Time at which the group meets",
        example: "100",
    }),
    __metadata("design:type", Number)
], UpdateGroupDto.prototype, "end_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "id of the room",
        example: 1,
    }),
    __metadata("design:type", Number)
], UpdateGroupDto.prototype, "room_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Status ",
        example: "true",
    }),
    __metadata("design:type", Boolean)
], UpdateGroupDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "id of course",
        example: "1",
    }),
    __metadata("design:type", Number)
], UpdateGroupDto.prototype, "course_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "id of teacher",
        example: 30,
    }),
    __metadata("design:type", Number)
], UpdateGroupDto.prototype, "teacher_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "end date of the group",
        example: "2023-02-01",
    }),
    __metadata("design:type", Date)
], UpdateGroupDto.prototype, "end_date", void 0);
//# sourceMappingURL=update-group.dto.js.map