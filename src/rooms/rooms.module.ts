import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { RoomsController } from "./rooms.controller";
import { Rooms } from "./model/room.model";

@Module({
  imports: [SequelizeModule.forFeature([Rooms])],

  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
 