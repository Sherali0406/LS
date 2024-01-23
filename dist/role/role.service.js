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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const role_model_1 = require("./model/role.model");
let RolesService = exports.RolesService = class RolesService {
    constructor(rolesRepo) {
        this.rolesRepo = rolesRepo;
    }
    async create(createRoleDto) {
        try {
            const exist = await this.rolesRepo.findOne({
                where: { name: createRoleDto.name },
            });
            if (exist) {
                throw new common_1.BadRequestException("This Role is already exist");
            }
            const role = await this.rolesRepo.create(createRoleDto);
            return role;
        }
        catch (error) {
            throw new common_1.BadRequestException("Bad request");
        }
    }
    async findRoleById(id) {
        const roles = await this.rolesRepo.findOne({
            where: { id },
            include: { all: true },
        });
        return roles;
    }
    async update(id, updateRoleDto) {
        const [_, [updatedRole]] = await this.rolesRepo.update(updateRoleDto, {
            where: { id },
            returning: true,
        });
        if (!updatedRole) {
            throw new common_1.BadRequestException("Role not found or not updated");
        }
        return updatedRole;
    }
    async getAllRoles(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const roles = await this.rolesRepo.findAll({
            limit,
            offset,
            include: { all: true },
        });
        const total = await this.rolesRepo.count();
        return { roles, total };
    }
    async remove(id) {
        const del = this.rolesRepo.destroy({ where: { id } });
        return del;
    }
};
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(role_model_1.Roles)),
    __metadata("design:paramtypes", [Object])
], RolesService);
//# sourceMappingURL=role.service.js.map