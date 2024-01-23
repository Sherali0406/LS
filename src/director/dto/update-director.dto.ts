import { PartialType } from '@nestjs/swagger';
import { CreateDirectorDto } from './create-director.dto';

export class UpdateDirectorDto extends PartialType(CreateDirectorDto) {
  role: string;
  course: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  image: string;
}
