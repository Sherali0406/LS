import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Rooms } from "./model/room.model";
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    create(createRoomDto: CreateRoomDto): Promise<Rooms>;
    getAllRooms(page: number, limit: number): Promise<{
        rooms: Rooms[];
        total: number;
    }>;
    findOne(id: string): Promise<Rooms>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<Rooms>;
    remove(id: string): Promise<number>;
}
