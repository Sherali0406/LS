import { Rooms } from "./model/room.model";
import { CreateRoomDto } from "../rooms/dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
export declare class RoomsService {
    private roomsRepo;
    constructor(roomsRepo: typeof Rooms);
    create(createRoomDto: CreateRoomDto): Promise<Rooms>;
    findRoomById(id: number): Promise<Rooms>;
    update(id: number, updateRoomDto: UpdateRoomDto): Promise<Rooms>;
    getAllRooms(page?: number, limit?: number): Promise<{
        rooms: Rooms[];
        total: number;
    }>;
    remove(id: number): Promise<number>;
}
