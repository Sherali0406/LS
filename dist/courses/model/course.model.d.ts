import { Groups } from './../../group/model/group.model';
import { Model } from "sequelize-typescript";
interface CoursesAttr {
    name: string;
    price: string;
    period: number;
    teacher_amount: number;
}
export declare class Courses extends Model<Courses, CoursesAttr> {
    id: number;
    name: string;
    price: string;
    period: number;
    teacher_amount: number;
    groups: Groups[];
}
export {};
