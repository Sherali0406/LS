import { IsBoolean, IsString, IsInt, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentAttendanceDto {
  @ApiProperty({
    type: Boolean,
    example: true,
    description: "Attendance participation status true/false",
  })
  @IsBoolean()
  participated: boolean;

  @ApiProperty({
    type: String,
    example: "2023-11-06",
    description: "Attendance date",
  })
  @IsString()
  date: string;

  @ApiProperty({ type: Number, example: 1, description: "Group ID" })
  // @IsInt()
  group_id: number;

  @ApiProperty({ type: Number, example: 1, description: "Lesson ID" })
  // @IsInt()
  lesson_id: number;

  @ApiProperty({ type: Number, example: 1, description: "Student ID" })
  // @IsInt()
  student_id: number;

  @ApiProperty({
    type: String,
    example: "Optional comment",
    description: "Optional comment",
  })
  @IsString()
  comment: string;

  @ApiProperty({ type: Number, example: 1, description: "Admin ID" })
  // @IsInt()
  admin_id: number;
}
