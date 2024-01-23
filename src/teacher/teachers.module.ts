import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { TeachersService } from "./teachers.service";
import { TeachersController } from "./teachers.controller";
import { Teachers } from "./model/teacher.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([Teachers]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY_AD,
      signOptions: { expiresIn: "24h" },
    }),
  ],

  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [JwtModule],
})
export class TeachersModule {}
