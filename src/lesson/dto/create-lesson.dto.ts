// import { IsString, IsInt, IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLessonDto {
  @ApiProperty({
    example: "lesson1",
    description: "Title of the lesson",
  })
  // @IsString()
  title: string;

  @ApiProperty({
    example: 1,
    description: "Group ID",
  })
  // @IsInt()
  group_id: number;

  @ApiProperty({
    example: "Bekzod",
    description: "Teacher of the lesson (optional)",
  })

  // @IsString()
  teacher: string;

  @ApiProperty({
    example: true,
    description: "Pass status (optional)",
  })

  // @IsBoolean()
  pass: boolean;

  @ApiProperty({
    example: "good",
    description: "Description (optional)",
  })

  // @IsString()
  description: string;

  @ApiProperty({
    example: "main admin",
    description: "Admin (optional)",
  })

  // @IsString()
  admin: string;
}
