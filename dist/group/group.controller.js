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
exports.GroupsController = void 0;
const common_1 = require("@nestjs/common");
const create_group_dto_1 = require("./dto/create-group.dto");
const swagger_1 = require("@nestjs/swagger");
const group_service_1 = require("./group.service");
const free_room_dto_1 = require("./dto/free-room-dto");
let GroupsController = exports.GroupsController = class GroupsController {
    constructor(groupsService) {
        this.groupsService = groupsService;
    }
    async create(createGroupDto) {
        return this.groupsService.createGroup(createGroupDto);
    }
    async findFreeRooms(getFreeRoomDto) {
        return this.groupsService.fetchAvailableRooms(getFreeRoomDto);
    }
    async findAll() {
        return this.groupsService.findAll();
    }
    async findOne(id) {
        return this.groupsService.fetchSingleGroup(id);
    }
    async remove(id) {
        return this.groupsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)("create-group"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_dto_1.CreateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("available-rooms"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [free_room_dto_1.GetFreeRoomDto]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "findFreeRooms", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupsController.prototype, "remove", null);
exports.GroupsController = GroupsController = __decorate([
    (0, swagger_1.ApiTags)("GROUPS"),
    (0, common_1.Controller)("groups"),
    __metadata("design:paramtypes", [group_service_1.GroupsService])
], GroupsController);
//# sourceMappingURL=group.controller.js.map