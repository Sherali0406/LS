import { DirectorsService } from './director.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { Director } from "./model/director.model";
import { DirectorsController } from './director.controller';

@Module({
  imports: [SequelizeModule.forFeature([Director])],

  controllers: [DirectorsController],
  providers: [DirectorsService],
})
export class DirectorsModule {}
