import { GroupTeacher } from "./model/group-teacher.model";
import { CreateGroupTeacherDto } from "./dto/create-group-teacher.dto";
import { UpdateGroupTeacherDto } from "./dto/update-group-teacher.dto";
export declare class GroupTeachersService {
    private groupTeachersRepo;
    constructor(groupTeachersRepo: typeof GroupTeacher);
    create(createGroupTeacherDto: CreateGroupTeacherDto): Promise<GroupTeacher>;
    findOne(id: number): Promise<GroupTeacher>;
    update(id: number, updateGroupTeacherDto: UpdateGroupTeacherDto): Promise<GroupTeacher>;
    getAllGroupTeachers(): Promise<GroupTeacher[]>;
    remove(id: number): Promise<number>;
}
