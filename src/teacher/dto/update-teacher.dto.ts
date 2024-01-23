import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTeacherDto } from "./create-teacher.dto";

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
  @ApiProperty({
    description: "The name of the teacher",
    example: "Alice",
  })
  name: string;

  @ApiProperty({
    description: "The surname of the teacher",
    example: "Smith",
  })
  surname: string;

  @ApiProperty({
    description: "role of user",
    example: "teacher",
  })
  role?: string;

  @ApiProperty({
    description: "The phone number of the teacher",
    example: "+1234567890",
  })
  phone_number: string;

  @ApiProperty({
    description: "The passowrd of the teacher",
    example: "+998999765302",
  })
  password: string;

  @ApiProperty({
    description: "The confirm passowrd of the teacher",
    example: "+998999765302",
  })
  confirm_password: string;
  
  @ApiProperty({
    description: "URL of the teacher's image",
    example: "https://example.com/teacher-image.jpg",
  })
  image: string;

  @ApiProperty({
    description: "The course the teacher is assigned to",
    example: "Computer Science",
  })
  course: string;

  @ApiProperty({
    description: "Active groups the teacher is assigned to",
    example: "A, B",
  })
  active_groups: string;

  @ApiProperty({
    description: "Status of the teacher",
    example: "Active",
  })
  status: string;
}
