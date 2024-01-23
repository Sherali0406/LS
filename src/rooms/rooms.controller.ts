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
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Rooms } from "./model/room.model";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("ROOMS")
@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {} 

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  async getAllRooms(
    @Query("page") page: number,
    @Query("limit") limit: number
  ): Promise<{ rooms: Rooms[]; total: number }> {
    return this.roomsService.getAllRooms(page, limit);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Rooms> {
    return this.roomsService.findRoomById(+id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) { 
    return this.roomsService.remove(+id);
  }

}
