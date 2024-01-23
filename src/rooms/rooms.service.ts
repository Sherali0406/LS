import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Rooms } from "./model/room.model";
import { CreateRoomDto } from "../rooms/dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Rooms) private roomsRepo: typeof Rooms) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      const exist = await this.roomsRepo.findOne({
        where: { name: createRoomDto.name },
      });
      if (exist) {
        throw new BadRequestException("This Room is already exist");
      }
      const room = await this.roomsRepo.create(createRoomDto);
      return room;  
    } catch (error) {
      throw new BadRequestException("Bad request");
    }
  }

  async findRoomById(id: number): Promise<Rooms> {
    const rooms = await this.roomsRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return rooms;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Rooms> {
    const [_, [updatedRoom]] = await this.roomsRepo.update(updateRoomDto, {
      where: { id },
      returning: true,
    });

    if (!updatedRoom) {
      throw new BadRequestException("Room not found or not updated");
    }

    return updatedRoom;
  }


  async getAllRooms(
    page: number = 1,
    limit: number = 10
  ): Promise<{ rooms: Rooms[]; total: number }> {
    const offset = (page - 1) * limit;

    const rooms = await this.roomsRepo.findAll({
      limit,
      offset,
      include: { all: true },
    });

    const total = await this.roomsRepo.count();

    return { rooms, total };
  }

  async remove(id: number) {
    const del = this.roomsRepo.destroy({ where: { id } });
    return del;
  }
}
