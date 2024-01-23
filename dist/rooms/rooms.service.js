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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const room_model_1 = require("./model/room.model");
let RoomsService = exports.RoomsService = class RoomsService {
    constructor(roomsRepo) {
        this.roomsRepo = roomsRepo;
    }
    async create(createRoomDto) {
        try {
            const exist = await this.roomsRepo.findOne({
                where: { name: createRoomDto.name },
            });
            if (exist) {
                throw new common_1.BadRequestException("This Room is already exist");
            }
            const room = await this.roomsRepo.create(createRoomDto);
            return room;
        }
        catch (error) {
            throw new common_1.BadRequestException("Bad request");
        }
    }
    async findRoomById(id) {
        const rooms = await this.roomsRepo.findOne({
            where: { id },
            include: { all: true },
        });
        return rooms;
    }
    async update(id, updateRoomDto) {
        const [_, [updatedRoom]] = await this.roomsRepo.update(updateRoomDto, {
            where: { id },
            returning: true,
        });
        if (!updatedRoom) {
            throw new common_1.BadRequestException("Room not found or not updated");
        }
        return updatedRoom;
    }
    async getAllRooms(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const rooms = await this.roomsRepo.findAll({
            limit,
            offset,
            include: { all: true },
        });
        const total = await this.roomsRepo.count();
        return { rooms, total };
    }
    async remove(id) {
        const del = this.roomsRepo.destroy({ where: { id } });
        return del;
    }
};
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(room_model_1.Rooms)),
    __metadata("design:paramtypes", [Object])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map