import { DirectorsService } from "./director.service";
import { CreateDirectorDto } from "./dto/create-director.dto";
import { UpdateDirectorDto } from "./dto/update-director.dto";
import { Director } from "./model/director.model";
export declare class DirectorsController {
    private readonly directorsService;
    constructor(directorsService: DirectorsService);
    create(createDirectorDto: CreateDirectorDto): Promise<Director>;
    getAllDirectors(page: number, limit: number): Promise<{
        directors: Director[];
        total: number;
    }>;
    update(id: string, updateDirectorDto: UpdateDirectorDto): Promise<Director>;
    findOne(id: string): Promise<Director>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
