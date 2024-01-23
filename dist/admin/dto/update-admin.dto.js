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
exports.UpdateAdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateAdminDto {
}
exports.UpdateAdminDto = UpdateAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "First name of the admin", example: "sherali" }),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Last name of the admin", example: "karimov" }),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Email address of the admin",
        example: "fasterffkarimov@gmail.com",
    }),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Phone number of the admin",
        example: "+998934244727",
    }),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "role of user",
        example: "admin",
    }),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Password for the admin", example: "karimovvv" }),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Password confirmation for the admin",
        example: "karimovvv",
    }),
    __metadata("design:type", String)
], UpdateAdminDto.prototype, "confirm_password", void 0);
//# sourceMappingURL=update-admin.dto.js.map