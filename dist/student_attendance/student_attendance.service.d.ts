import { CreateStudentAttendanceDto } from "./dto/create-student_attendance.dto";
import { UpdateStudentAttendanceDto } from "./dto/update-student_attendance.dto";
import { StudentAttendance } from "./model/student_attendance.model";
import { GroupsService } from "../group/group.service";
export declare class StudentAttendanceService {
    private studentAttendanceRepo;
    private readonly groupsService;
    constructor(studentAttendanceRepo: typeof StudentAttendance, groupsService: GroupsService);
    create(createStudentAttendanceDto: CreateStudentAttendanceDto): Promise<StudentAttendance>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateStudentAttendanceDto: UpdateStudentAttendanceDto): string;
    remove(id: number): string;
}
