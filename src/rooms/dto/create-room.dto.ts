import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean } from "class-validator";

export class CreateRoomDto {
  @ApiProperty({
    description: "The name of the room",
    example: "Conference Room A",
  })
  @IsString()
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
  @IsBoolean()
  is_available: boolean;
}
