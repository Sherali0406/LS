import { CreateGroupTeacherDto } from "./dto/create-group-teacher.dto";
import { UpdateGroupTeacherDto } from "./dto/update-group-teacher.dto";
import { GroupTeachersService } from "./group-teacher.service";
import { GroupTeacher } from "./model/group-teacher.model";
export declare class GroupTeachersController {
    private readonly groupTeachersService;
    constructor(groupTeachersService: GroupTeachersService);
    create(createGroupTeacherDto: CreateGroupTeacherDto): Promise<GroupTeacher>;
    findOne(id: string): Promise<GroupTeacher>;
    getAllGroupTeachers(): Promise<GroupTeacher[]>;
    update(id: string, updateGroupTeacherDto: UpdateGroupTeacherDto): Promise<GroupTeacher>;
    remove(id: string): Promise<number>;
}
