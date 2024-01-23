import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Roles } from "./model/role.model";
import { RolesService } from "./role.service";
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<Roles>;
    getAllRoles(page: number, limit: number): Promise<{
        roles: Roles[];
        total: number;
    }>;
    findOne(id: string): Promise<Roles>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<Roles>;
    remove(id: string): Promise<number>;
}
