import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    description: "The name of the role.",
    example: "admin",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "A brief description of the role (optional).",
    example: "Responsible for site",
  })
  @IsString()
  @IsOptional()
  description: string;
}
