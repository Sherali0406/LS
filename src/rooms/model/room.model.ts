import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Groups } from "../../group/model/group.model";

interface RoomsAttr {
  name: string;
  room_size: number;
  is_available: boolean;
}
@Table({ tableName: "rooms" })
export class Rooms extends Model<Rooms, RoomsAttr> {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
  })
  room_size: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_available: boolean;

  @HasMany(()=>Groups)
  group:Groups[]


}
