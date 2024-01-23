import { Model } from "sequelize-typescript";
interface GroupTeacherAttr {
    group: string;
    teacher: string;
    is_available: boolean;
}
export declare class GroupTeacher extends Model<GroupTeacher, GroupTeacherAttr> {
    id: number;
    group: string;
    teacher: string;
}
export {};
