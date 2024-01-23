import { CreateDirectorDto } from './create-director.dto';
declare const UpdateDirectorDto_base: import("@nestjs/common").Type<Partial<CreateDirectorDto>>;
export declare class UpdateDirectorDto extends UpdateDirectorDto_base {
    role: string;
    course: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    image: string;
}
export {};
