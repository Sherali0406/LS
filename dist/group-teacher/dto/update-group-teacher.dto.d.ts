import { CreateGroupTeacherDto } from './create-group-teacher.dto';
declare const UpdateGroupTeacherDto_base: import("@nestjs/common").Type<Partial<CreateGroupTeacherDto>>;
export declare class UpdateGroupTeacherDto extends UpdateGroupTeacherDto_base {
    group: string;
    teacher: string;
}
export {};
