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
exports.UpdateRoomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_room_dto_1 = require("./create-room.dto");
const swagger_2 = require("@nestjs/swagger");
class UpdateRoomDto extends (0, swagger_1.PartialType)(create_room_dto_1.CreateRoomDto) {
}
exports.UpdateRoomDto = UpdateRoomDto;
__decorate([
    (0, swagger_2.ApiProperty)({
        description: "The name of the room",
        example: "Conference Room A",
    }),
    __metadata("design:type", String)
], UpdateRoomDto.prototype, "name", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        description: "The size of the room",
        example: 22,
    }),
    __metadata("design:type", Number)
], UpdateRoomDto.prototype, "room_size", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({
        description: "Availability status of the room",
        example: true,
    }),
    __metadata("design:type", Boolean)
], UpdateRoomDto.prototype, "is_available", void 0);
//# sourceMappingURL=update-room.dto.js.map