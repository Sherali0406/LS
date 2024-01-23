import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from './model/role.model';
import { RolesController } from './role.controller';
import { RolesService } from './role.service';

@Module({
  imports: [SequelizeModule.forFeature([Roles])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RoleModule {}
