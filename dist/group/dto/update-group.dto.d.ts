import { CreateGroupDto } from "./create-group.dto";
declare const UpdateGroupDto_base: import("@nestjs/common").Type<Partial<CreateGroupDto>>;
export declare class UpdateGroupDto extends UpdateGroupDto_base {
    name: string;
    start_date: string;
    days: boolean;
    start_time: number;
    end_time: number;
    room_id: number;
    status: boolean;
    course_id: number;
    teacher_id: number;
    end_date: Date;
}
export {};
