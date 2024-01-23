// src/groups/dto/group.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsDate,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsDateString,
} from "class-validator";

export class CreateGroupDto {
  @ApiProperty({
    description: "The name of the group",
    example: "Group A",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Start date of the group",
    example: "2023-01-01",
  })
  @IsDateString()
  start_date: string;

  @ApiProperty({
    description: "Days of the week on which the group meets",
    example: "true",
  })
  @IsBoolean()
  days: boolean;

  @IsNumber()
  @ApiProperty({
    description: "Start_Time at which the group meets with minutes",
    example: "60",
  })
  start_time: number;

  @IsNumber()
  @ApiProperty({
    description: "End_Time at which the group meets with minutes",
    example: "100",
  })
  end_time: number;

  @ApiProperty({
    description: "id of the room",
    example: 1,
  })
  room_id: number;

  @ApiProperty({
    description: "Status ",
    example: "true",
  })
  @IsBoolean()
  status?: boolean;

  @ApiProperty({
    description: "id of course",
    example: "1",
  })
  @IsNotEmpty()
  course_id: number;

  @ApiProperty({
    description: "id of teacher",
    example: 1,
  })
  @IsNumber()
  teacher_id: number;

  @ApiProperty({
    description: "end date of the group",
    example: "2023-02-01",
  })
  end_date: Date;
}
