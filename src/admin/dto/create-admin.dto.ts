import {
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsString,
  Length,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "First name of the admin", example: "sherali" })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "Last name of the admin", example: "karimov" })
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "Email address of the admin",
    example: "fasterffkarimov@gmail.com",
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Phone number of the admin",
    example: "+998934244727",
  })
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "role of user ",
    example: "admin",
  })
  role: string;

  @IsNotEmpty()
  @IsString()
  @Length(8) // Example: Minimum password length is 8 characters
  @ApiProperty({ description: "Password for the admin", example: "karimovvv" })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "Password confirmation for the admin",
    example: "karimovvv",
  })
  confirm_password: string;

}
