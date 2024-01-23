import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginTeacherDto {
  @ApiProperty({
    type: String,
    example: "+998999765302",
    required: true,
  })
  @IsString()
  @IsNotEmpty({
    message: "Phone number should not be empty",
  })
  phone_number: string;

  @ApiProperty({
    type: String,
    example: "+998999765302",
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: "Password should not be empty" })
  password: string;
}
