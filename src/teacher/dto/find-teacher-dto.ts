import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class FindTeacherDto {
  @ApiProperty({
    description: "The phone number of the teacher",
    example: "+998999765302",
  })
  @IsPhoneNumber()
  phone_number: string;
}
