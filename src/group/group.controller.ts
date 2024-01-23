import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Groups } from "./model/group.model";
import { ApiTags } from "@nestjs/swagger";
import { GroupsService } from "./group.service";
import { GetFreeRoomDto } from "./dto/free-room-dto";
@ApiTags("GROUPS")
@Controller("groups")
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post("create-group")
  async create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Post("available-rooms")
  async findFreeRooms(@Body() getFreeRoomDto: GetFreeRoomDto) {
    return this.groupsService.fetchAvailableRooms(getFreeRoomDto);
  }

  @Get()
  async findAll(): Promise<Groups[]> {
    return this.groupsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.groupsService.fetchSingleGroup(id);
  }

  // @Patch(":id")
  // async update(
  //   @Param("id") id: string,
  //   @Body() updateGroupDto: UpdateGroupDto
  // ) {
  //   return this.groupsService.update(+id, updateGroupDto);
  // }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.groupsService.remove(+id);
  }
}
