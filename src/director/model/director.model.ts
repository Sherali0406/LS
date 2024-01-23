import { ApiProperty } from "@nestjs/swagger";
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

interface DirectorAttr {
  role: string;
  course: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  image: string;
}
@Table({ tableName: "director" })
export class Director extends Model<Director, DirectorAttr> {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  role: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.STRING,
  })
  course: string;

}
