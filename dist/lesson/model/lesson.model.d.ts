import { Model } from "sequelize-typescript";
import { Groups } from "../../group/model/group.model";
interface LessonAttr {
    title: string;
    group_id: number;
    teacher: string;
    pass: boolean;
    description: string;
    admin: string;
}
export declare class Lesson extends Model<Lesson, LessonAttr> {
    id: number;
    title: string;
    group_id: number;
    teacher: string;
    pass: boolean;
    description: string | null;
    admin: string | null;
    groups: Groups;
}
export {};
