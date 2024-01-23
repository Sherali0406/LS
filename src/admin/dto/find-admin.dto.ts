import { IsEmail, IsString, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class findAdminDto {
  @IsString()
  @ApiProperty({
    required: false,
    description: "First name of the admin",
    example: "sherali",
  })
  first_name?: string;

  @IsString()
  @ApiProperty({
    required: false,
    description: "Phone number of the admin",
    example: "+998934244727",
  })
  phone_number?: string;
}
