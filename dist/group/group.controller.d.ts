import { CreateGroupDto } from "./dto/create-group.dto";
import { Groups } from "./model/group.model";
import { GroupsService } from "./group.service";
import { GetFreeRoomDto } from "./dto/free-room-dto";
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    create(createGroupDto: CreateGroupDto): Promise<Groups>;
    findFreeRooms(getFreeRoomDto: GetFreeRoomDto): Promise<import("../rooms/model/room.model").Rooms[]>;
    findAll(): Promise<Groups[]>;
    findOne(id: string): Promise<{
        group: Groups;
    }>;
    remove(id: string): Promise<number>;
}
