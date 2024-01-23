import { Model } from "sequelize-typescript";
import { Admin } from "../../admin/model/admin.model";
import { Groups } from "../../group/model/group.model";
import { Students } from "../../students/model/student.model";
interface StudentAttendanceAttr {
    participated: boolean;
    date: string;
    group_id: number;
    lesson_id: number;
    student_id: number;
    comment: string;
    admin_id: number;
}
export declare class StudentAttendance extends Model<StudentAttendance, StudentAttendanceAttr> {
    id: number;
    participated: boolean;
    date: string;
    group_id: number;
    lesson_id: number;
    student_id: number;
    comment: string;
    admin_id: number;
    groups: Groups;
    students: Students;
    admins: Admin;
}
export {};
