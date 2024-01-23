import { ApiProperty } from "@nestjs/swagger";

export class UpdateCourseDto {
  @ApiProperty({ description: "Name of the course", example: "IT" })
  name?: string;

  @ApiProperty({ description: "Price of the course", example: "5600" })
  price?: string;

  @ApiProperty({ description: "Period of the course", example: "6" })
  period?: number;

  @ApiProperty({
    description: "Number of teachers for the course",
    example: 21,
  })
  teacher_amount?: number;
}
