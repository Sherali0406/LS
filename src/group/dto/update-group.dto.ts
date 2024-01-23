import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from "./create-group.dto";

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @ApiProperty({
    description: "The name of the group",
    example: "Group A",
  })
  name: string;

  @ApiProperty({
    description: "Start date of the group",
    example: "2023-01-01",
  })

  start_date: string;

  @ApiProperty({
    description: "Days of the week on which the group meets",
    example: "true",
  })
  days: boolean;

  @ApiProperty({
    description: "Start_Time at which the group meets",
    example: "60",
  })
  start_time: number;

  @ApiProperty({
    description: "End_Time at which the group meets",
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
  status: boolean;

  @ApiProperty({
    description: "id of course",
    example: "1",
  })
  course_id: number;

  @ApiProperty({
    description: "id of teacher",
    example: 30,
  })
  teacher_id: number;

  @ApiProperty({
    description: "end date of the group",
    example: "2023-02-01",
  })
  end_date: Date;
}
