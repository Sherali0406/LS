import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Roles } from "./model/role.model";
import { ApiTags } from "@nestjs/swagger";
import { RolesService } from "./role.service";
@ApiTags("ROLES")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  async getAllRoles(
    @Query("page") page: number,
    @Query("limit") limit: number
  ): Promise<{ roles: Roles[]; total: number }> {
    return this.rolesService.getAllRoles(page, limit);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Roles> {
    return this.rolesService.findRoleById(+id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.rolesService.remove(+id);
  }
}
