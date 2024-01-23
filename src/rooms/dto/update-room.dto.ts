import { PartialType } from "@nestjs/swagger";
import { CreateRoomDto } from "./create-room.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiProperty({
    description: "The name of the room",
    example: "Conference Room A",
  })
  name: string;

  @ApiProperty({
    description: "The size of the room",
    example: 22,
  })
  room_size: number;

  @ApiProperty({
    description: "Availability status of the room",
    example: true,
  })
  is_available: boolean;
}
