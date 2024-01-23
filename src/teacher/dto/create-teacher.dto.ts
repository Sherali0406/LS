import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsPhoneNumber, IsUrl, IsIn } from "class-validator";

export class CreateTeacherDto {
  @ApiProperty({
    description: "The name of the teacher",
    example: "Lutfulla",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "The surname of the teacher",
    example: "To'rayev",
  })
  @IsString()
  surname: string;

  @ApiProperty({
    description: "The phone number of the teacher",
    example: "+998999765302",
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
  @IsUrl()
  image: string;

  @ApiProperty({
    description: "The course the teacher is assigned to",
    example: "Computer Science",
  })
  @IsString()
  course: string;

  @ApiProperty({
    description: "Active groups the teacher is assigned to",
    example: "A, B",
  })
  @IsString()
  active_groups: string;

  @ApiProperty({
    description: "Status of the teacher",
    example: "Active",
  })
  status: string;
}
