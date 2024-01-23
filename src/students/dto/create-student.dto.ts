import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsPhoneNumber } from "class-validator";

export class CreateStudentDto {
  @ApiProperty({
    description: "The name of the student",
    example: "John",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "The surname of the student",
    example: "Doe",
  })
  @IsString()
  surname: string;

  @ApiProperty({
    description: "The phone number of the student",
    example: "+998999765302",
  })
  phone_number: string;

  @ApiProperty({
    description: "The password of the student",
    example: "+998999765302",
  })
  password: string;

  @ApiProperty({
    description: "The confirm password of the student",
    example: "+998999765302",
  })
  confirm_password: string;

  @ApiProperty({
    description: "Courses the student is enrolled in",
    example: "Math, Physics",
  })
  @IsString()
  courses: string;

  @ApiProperty({
    description: "Groups the student belongs to",
    example: "A, B",
  })
  @IsString()
  groups: string;

  @ApiProperty({
    description: "Status of the student",
    example: "Active",
    enum: ["Active", "Inactive"],
  })
  status: string; 
}
