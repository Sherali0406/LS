import { SequelizeModule } from "@nestjs/sequelize";
import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { Students } from "./model/student.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([Students]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_KEY_AD,
      signOptions: { expiresIn: "24h" },
    }),
  ],

  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
