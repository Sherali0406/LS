import { PartialType } from "@nestjs/swagger";
import { CreateRoleDto } from "./create-role.dto";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({
    description: "The name of the role.",
    example: "admin",

  })
  name: string;

  @ApiProperty({
    description: "A brief description of the role (optional).",
    example: "Responsible for site",
  })
  description: string;
}
