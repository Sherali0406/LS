import { Model } from "sequelize-typescript";
import { Groups } from "../../group/model/group.model";
interface RoomsAttr {
    name: string;
    room_size: number;
    is_available: boolean;
}
export declare class Rooms extends Model<Rooms, RoomsAttr> {
    id: number;
    name: string;
    room_size: number;
    is_available: boolean;
    group: Groups[];
}
export {};
