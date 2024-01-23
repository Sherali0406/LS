import { CreateRoomDto } from "./create-room.dto";
declare const UpdateRoomDto_base: import("@nestjs/common").Type<Partial<CreateRoomDto>>;
export declare class UpdateRoomDto extends UpdateRoomDto_base {
    name: string;
    room_size: number;
    is_available: boolean;
}
export {};
