import { IsString, IsNumber, IsNotEmpty, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "Name of the course", example: "IT" })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "Price of the course", example: "5600" })
  price: string;

  @IsNotEmpty()
  @ApiProperty({ description: "Period of the course", example: 6 })
  period: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: "Number of teachers for the course",
    example: 20,
  })
  teacher_amount: number;
}
