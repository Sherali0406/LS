import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGroupTeacherDto {
  @ApiProperty({
    description: "The name of the group",
    example: "IT",
  })
  @IsString()
  group: string;

  @ApiProperty({
    description: "The name of teacher",
    example: "Bekzod",
  })
  @IsString()
  teacher: string;


}
