import { Model } from "sequelize-typescript";
interface GroupStudentAttr {
    group: string;
    student_phone: string;
}
export declare class GroupStudents extends Model<GroupStudents, GroupStudentAttr> {
    id: number;
    group: string;
    student_phone: string;
}
export {};
