import { Model } from "sequelize-typescript";
interface DirectorAttr {
    role: string;
    course: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    image: string;
}
export declare class Director extends Model<Director, DirectorAttr> {
    id: number;
    first_name: string;
    last_name: string;
    role: string;
    phone_number: string;
    image: string;
    course: string;
}
export {};
