import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupStudentsDto {
  @ApiProperty({
    example: "AbuTech",
    description: "Name of the group",
  })
  @IsNotEmpty()
  @IsString()
  group: string;

  @ApiProperty({
    example: "+998999765302",
    description: "Phone number of the student",
  })
  @IsNotEmpty()
  @IsString()
  student_phone: string;
}
