export declare class Teacher {
}
import { Model } from "sequelize-typescript";
interface TeachersAttr {
    name: string;
    surname: string;
    role: string;
    phone_number: string;
    password: string;
    hashed_password: string;
    hashed_refresh_token: string;
    image: string;
    course: string;
    active_groups: string;
    status: string;
}
export declare class Teachers extends Model<Teachers, TeachersAttr> {
    id: number;
    name: string;
    surname: string;
    role: string;
    phone_number: string;
    password: string;
    hashed_password: string;
    hashed_refresh_token: string;
    image: string;
    course: string;
    active_groups: string;
    status: string;
}
export {};
