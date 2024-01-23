import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Roles } from "./model/role.model";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private rolesRepo: typeof Roles) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const exist = await this.rolesRepo.findOne({
        where: { name: createRoleDto.name },
      });
      if (exist) {
        throw new BadRequestException("This Role is already exist");
      }
      const role = await this.rolesRepo.create(createRoleDto);
      return role;
    } catch (error) {
      throw new BadRequestException("Bad request");
    }
  }

  async findRoleById(id: number): Promise<Roles> {
    const roles = await this.rolesRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return roles;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Roles> {
    const [_, [updatedRole]] = await this.rolesRepo.update(updateRoleDto, {
      where: { id },
      returning: true,
    });

    if (!updatedRole) {
      throw new BadRequestException("Role not found or not updated");
    }

    return updatedRole;
  }

  async getAllRoles(
    page: number = 1,
    limit: number = 10
  ): Promise<{ roles: Roles[]; total: number }> {
    const offset = (page - 1) * limit;

    const roles = await this.rolesRepo.findAll({
      limit,
      offset,
      include: { all: true },
    });

    const total = await this.rolesRepo.count();

    return { roles, total };
  }

  async remove(id: number) {
    const del = this.rolesRepo.destroy({ where: { id } });
    return del;
  }
}
