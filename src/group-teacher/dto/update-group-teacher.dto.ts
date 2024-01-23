import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGroupTeacherDto } from './create-group-teacher.dto';

export class UpdateGroupTeacherDto extends PartialType(CreateGroupTeacherDto) {
  @ApiProperty({
    description: "The name of the group",
    example: "IT",
  })
  group: string;

  @ApiProperty({
    description: "The name of teacher",
    example: "Bekzod",
  })
  teacher: string;
}
