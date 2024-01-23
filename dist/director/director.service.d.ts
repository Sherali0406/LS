import { CreateDirectorDto } from "./dto/create-director.dto";
import { UpdateDirectorDto } from "./dto/update-director.dto";
import { Director } from "./model/director.model";
export declare class DirectorsService {
    private directorsRepo;
    constructor(directorsRepo: typeof Director);
    create(createDirectorDto: CreateDirectorDto): Promise<Director>;
    findDirectorById(id: number): Promise<Director>;
    update(id: number, updateDirectorDto: UpdateDirectorDto): Promise<Director>;
    getAllDirectors(page?: number, limit?: number): Promise<{
        directors: Director[];
        total: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
