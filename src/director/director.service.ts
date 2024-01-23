import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDirectorDto } from "./dto/create-director.dto";
import { UpdateDirectorDto } from "./dto/update-director.dto";
import { Director } from "./model/director.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class DirectorsService {
  constructor(@InjectModel(Director) private directorsRepo: typeof Director) {}

  async create(createDirectorDto: CreateDirectorDto) {
    try {
      const exist = await this.directorsRepo.findOne({
        where: { first_name: createDirectorDto.first_name },
      });
      if (exist) {
        throw new BadRequestException("This Director is already exist");
      }
      const director = await this.directorsRepo.create(createDirectorDto);
      return director;
    } catch (error) {
      throw new BadRequestException("Bad request");
    }
  }

  async findDirectorById(id: number): Promise<Director> {
    const director = await this.directorsRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return director;
  }

  async update(id: number, updateDirectorDto: UpdateDirectorDto): Promise<Director> {
    const [_, [updatedDirector]] = await this.directorsRepo.update(
      updateDirectorDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (!updatedDirector) {
      throw new BadRequestException("Director not found or not updated");
    }

    return updatedDirector;
  }

  // async findAll(
  //   findDirectorDto: findDirectorDto,
  //   page: number = 1,
  //   limit: number = 10
  // ): Promise<{ directors: Director[]; total: number }> {
  //   const where = { name: findDirectorDto.name };

  //   const offset = (page - 1) * limit;

  //   const directors = await this.directorsRepo.findAll({
  //     where,
  //     limit,
  //     offset,
  //   });

  //   const total = await this.directorsRepo.count({ where });

  //   if (!directors || directors.length === 0) {
  //     throw new BadRequestException("director did not found");
  //   }

  //   return { directors, total };
  // }

  async getAllDirectors(
    page: number = 1,
    limit: number = 10
  ): Promise<{ directors: Director[]; total: number }> {
    const offset = (page - 1) * limit;

    const directors = await this.directorsRepo.findAll({
      limit,
      offset,
      include: { all: true },
    });

    const total = await this.directorsRepo.count();

    return { directors, total };
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException("Invalid ID");
    }
    const director = await this.directorsRepo.findOne({ where: { id } });

    if (!director) {
      throw new HttpException(
        "Director is not found by the given ID",
        HttpStatus.NO_CONTENT //(NO_CONTENT) to indicate that the user was not found.
      );
    }

    await director.destroy();

    return { message: "Deleted successfully" };
  }
}
