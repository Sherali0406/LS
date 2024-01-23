import { Model } from "sequelize-typescript";
interface RolesAttr {
    name: string;
    description: string;
}
export declare class Roles extends Model<Roles, RolesAttr> {
    id: number;
    name: string;
    description: string;
}
export {};
