import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DirectorsService } from "./director.service";
import { CreateDirectorDto } from "./dto/create-director.dto";
import { UpdateDirectorDto } from "./dto/update-director.dto";
import { Director } from "./model/director.model";

@ApiTags("COURSES")
@Controller("directors")
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @Post()
  async create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorsService.create(createDirectorDto);
  }

  @Get()
  getAllDirectors(
    @Query("page") page: number,
    @Query("limit") limit: number
  ): Promise<{ directors: Director[]; total: number }> {
    return this.directorsService.getAllDirectors(page, limit);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDirectorDto: UpdateDirectorDto
  ) {
    return this.directorsService.update(+id, updateDirectorDto);
  }
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Director> {
    return this.directorsService.findDirectorById(+id);
  }

  // @Post("find")
  // findAll(@Body() findDirectorDto: findDirectorDto) {
  //   return this.directorsService.findAll(findDirectorDto);
  // }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.directorsService.remove(id);
  }
}
