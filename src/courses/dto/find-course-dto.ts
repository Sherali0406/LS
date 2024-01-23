import { ApiProperty } from "@nestjs/swagger";

export class findCourseDto {
  @ApiProperty({
    description: " name of the course",
    example: "IT",
  })
  name?: string;
}
