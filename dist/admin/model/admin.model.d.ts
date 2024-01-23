import { StudentAttendance } from "../../student_attendance/model/student_attendance.model";
import { Model } from "sequelize-typescript";
interface AdminAttr {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: string;
    password: string;
    confirm_password: string;
    hashed_password: string;
    hashed_refresh_token: string;
}
export declare class Admin extends Model<Admin, AdminAttr> {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: string;
    hashed_password: string;
    hashed_refresh_token: string;
    activation_link: string;
    studentAttendances: StudentAttendance[];
}
export {};
