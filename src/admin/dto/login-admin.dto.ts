import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginAdminDto {
  @IsString()
  @ApiProperty({
    description: "Phone number of the admin for login",
    example: "+998934244727",
  })
  phone_number: string;

  @IsString()
  @ApiProperty({
    description: "Password for the admin for login",
    example: "karimovvv",
  })
  password: string;
}
