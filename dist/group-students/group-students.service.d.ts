import { StudentsService } from "./../students/students.service";
import { CreateGroupStudentsDto } from "./dto/create-group-student.dto";
import { UpdateGroupStudentsDto } from "./dto/update-group-student.dto";
import { GroupStudents } from "./model/group-student.mode";
import { GroupsService } from "../group/group.service";
export declare class GroupStudentsService {
    private groupStudentsRepo;
    private readonly studentsService;
    private readonly groupsService;
    constructor(groupStudentsRepo: typeof GroupStudents, studentsService: StudentsService, groupsService: GroupsService);
    create(createGroupStudentsDto: CreateGroupStudentsDto): Promise<GroupStudents>;
    findGroup_studentById(id: number): Promise<GroupStudents>;
    update(id: number, updateGroupStudentsDto: UpdateGroupStudentsDto): Promise<GroupStudents>;
    getAllGroupStudents(page?: number, limit?: number): Promise<{
        groupStudents: GroupStudents[];
        total: number;
    }>;
    remove(id: number): Promise<number>;
}
