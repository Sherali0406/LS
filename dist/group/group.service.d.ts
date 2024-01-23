import { Groups } from "./model/group.model";
import { CreateGroupDto } from "./dto/create-group.dto";
import { RoomsService } from "../rooms/rooms.service";
import { CoursesService } from "../courses/courses.service";
import { TeachersService } from "../teacher/teachers.service";
import { GetFreeRoomDto } from "./dto/free-room-dto";
import { Rooms } from "../rooms/model/room.model";
import { LessonService } from "../lesson/lesson.service";
export declare class GroupsService {
    private groupsRepo;
    private readonly roomsService;
    private readonly coursesService;
    private readonly teacherService;
    private readonly lessonService;
    constructor(groupsRepo: typeof Groups, roomsService: RoomsService, coursesService: CoursesService, teacherService: TeachersService, lessonService: LessonService);
    createGroup(createGroupDto: CreateGroupDto): Promise<Groups>;
    fetchAllGroups(page: number, limit: number): Promise<{
        groups: Groups[];
        count: number;
    }>;
    fetchAvailableRooms(getFreeRoomDto: GetFreeRoomDto): Promise<Rooms[]>;
    fetchSingleGroup(id: string): Promise<{
        group: Groups;
    }>;
    findAll(): Promise<Groups[]>;
    remove(id: number): Promise<number>;
}
