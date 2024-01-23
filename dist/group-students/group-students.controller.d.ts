import { CreateGroupStudentsDto } from "./dto/create-group-student.dto";
import { UpdateGroupStudentsDto } from "./dto/update-group-student.dto";
import { GroupStudentsService } from "./group-students.service";
import { GroupStudents } from "./model/group-student.mode";
export declare class GroupStudentsController {
    private readonly groupStudentsService;
    constructor(groupStudentsService: GroupStudentsService);
    create(createGroupStudentDto: CreateGroupStudentsDto): Promise<GroupStudents>;
    getAllGroupStudents(page: number, limit: number): Promise<{
        groupStudents: GroupStudents[];
        total: number;
    }>;
    findOne(id: string): Promise<GroupStudents>;
    update(id: string, updateGroupStudentsDto: UpdateGroupStudentsDto): Promise<GroupStudents>;
    remove(id: string): Promise<number>;
}
