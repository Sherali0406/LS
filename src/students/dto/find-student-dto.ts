import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class findStudentsDto {
  @ApiProperty({
    description: "The phone number of the student",
    example: "+998934244727",
  })
  @IsPhoneNumber()
  phone_number: string;
}
