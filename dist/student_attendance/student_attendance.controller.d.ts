import { StudentAttendanceService } from './student_attendance.service';
import { CreateStudentAttendanceDto } from './dto/create-student_attendance.dto';
import { UpdateStudentAttendanceDto } from './dto/update-student_attendance.dto';
export declare class StudentAttendanceController {
    private readonly studentAttendanceService;
    constructor(studentAttendanceService: StudentAttendanceService);
    create(createStudentAttendanceDto: CreateStudentAttendanceDto): Promise<import("./model/student_attendance.model").StudentAttendance>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateStudentAttendanceDto: UpdateStudentAttendanceDto): string;
    remove(id: string): string;
}
