import { IsBoolean, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAdminDto {
  @ApiProperty({ description: "First name of the admin", example: "sherali" })
  first_name?: string;

  @ApiProperty({ description: "Last name of the admin", example: "karimov" })
  last_name?: string;

  @ApiProperty({
    description: "Email address of the admin",
    example: "fasterffkarimov@gmail.com",
  })
  email?: string;

  @ApiProperty({
    description: "Phone number of the admin",
    example: "+998934244727",
  })
  phone_number?: string;

  @ApiProperty({
    description: "role of user",
    example: "admin",
  })
  role?: string;

  @ApiProperty({ description: "Password for the admin", example: "karimovvv" })
  password?: string;

  @ApiProperty({
    description: "Password confirmation for the admin",
    example: "karimovvv",
  })
  confirm_password?: string;
}
