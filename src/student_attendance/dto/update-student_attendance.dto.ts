import { ApiProperty } from "@nestjs/swagger";

export class UpdateStudentAttendanceDto {
  @ApiProperty({
    type: Boolean,
    example: true,
    description: "Attendance participation status",
  })
  participated: boolean;

  @ApiProperty({
    type: String,
    example: "2023-11-06",
    description: "Attendance date",
  })
  date: string;

  @ApiProperty({ type: Number, example: 1, description: "Group ID" })
  group_id: number;

  @ApiProperty({ type: Number, example: 1, description: "Lesson ID" })
  lesson_id: number;

  @ApiProperty({ type: Number, example: 1, description: "Student ID" })
  student_id: number;

  @ApiProperty({
    type: String,
    example: "Optional comment",
    description: "Optional comment",
  })
  comment: string;

  @ApiProperty({ type: Number, example: 1, description: "Admin ID" })
  admin_id: number;
}
