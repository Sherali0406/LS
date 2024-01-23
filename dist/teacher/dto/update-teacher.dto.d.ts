import { CreateTeacherDto } from "./create-teacher.dto";
declare const UpdateTeacherDto_base: import("@nestjs/common").Type<Partial<CreateTeacherDto>>;
export declare class UpdateTeacherDto extends UpdateTeacherDto_base {
    name: string;
    surname: string;
    role?: string;
    phone_number: string;
    password: string;
    confirm_password: string;
    image: string;
    course: string;
    active_groups: string;
    status: string;
}
export {};
