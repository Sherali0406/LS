import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateStudentDto } from "./create-student.dto";

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiProperty({
    description: "The name of the student",
    example: "John",
  })
  name: string;

  @ApiProperty({
    description: "The surname of the student",
    example: "Doe",
  })
  surname: string;

  @ApiProperty({
    description: "The phone number of the student",
    example: "+1234567890",
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
  confirm_password:string

  @ApiProperty({
    description: "Courses the student is enrolled in",
    example: "Math, Physics",
  })
  courses: string;

  @ApiProperty({
    description: "Groups the student belongs to",
    example: "A, B",
  })
  groups: string;

  @ApiProperty({
    description: "Status of the student",
    example: "Active",
  })
  status: string;
}
