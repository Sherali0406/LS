import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGroupStudentsDto } from './create-group-student.dto';

export class UpdateGroupStudentsDto extends PartialType(CreateGroupStudentsDto) {
  @ApiProperty({
    example: "AbuTeach",
    description: "Name of the group",
  })
  group: string;

  @ApiProperty({
    example: "+998999765302",
    description: "Phone number of the student",
  })
  student_phone: string;
}
