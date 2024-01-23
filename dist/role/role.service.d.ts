import { Roles } from "./model/role.model";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
export declare class RolesService {
    private rolesRepo;
    constructor(rolesRepo: typeof Roles);
    create(createRoleDto: CreateRoleDto): Promise<Roles>;
    findRoleById(id: number): Promise<Roles>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<Roles>;
    getAllRoles(page?: number, limit?: number): Promise<{
        roles: Roles[];
        total: number;
    }>;
    remove(id: number): Promise<number>;
}
