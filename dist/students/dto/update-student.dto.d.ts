import { CreateStudentDto } from "./create-student.dto";
declare const UpdateStudentDto_base: import("@nestjs/common").Type<Partial<CreateStudentDto>>;
export declare class UpdateStudentDto extends UpdateStudentDto_base {
    name: string;
    surname: string;
    phone_number: string;
    password: string;
    confirm_password: string;
    courses: string;
    groups: string;
    status: string;
}
export {};
