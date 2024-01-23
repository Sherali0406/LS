import { Model } from "sequelize-typescript";
import { StudentAttendance } from "../../student_attendance/model/student_attendance.model";
interface StudentsAttr {
    name: string;
    surname: string;
    phone_number: string;
    password: string;
    role: string;
    courses: string;
    groups: string;
    status: string;
    hashed_password: string;
    hashed_refresh_token: string;
}
export declare class Students extends Model<Students, StudentsAttr> {
    id: number;
    name: string;
    surname: string;
    role: string;
    phone_number: string;
    password: string;
    hashed_password: string;
    hashed_refresh_token: string;
    courses: string;
    groups: string;
    status: string;
    studentAttendances: StudentAttendance[];
}
export {};
