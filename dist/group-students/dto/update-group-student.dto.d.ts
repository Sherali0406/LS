import { CreateGroupStudentsDto } from './create-group-student.dto';
declare const UpdateGroupStudentsDto_base: import("@nestjs/common").Type<Partial<CreateGroupStudentsDto>>;
export declare class UpdateGroupStudentsDto extends UpdateGroupStudentsDto_base {
    group: string;
    student_phone: string;
}
export {};
