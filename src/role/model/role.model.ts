import { Groups } from "./../../group/model/group.model";
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

interface RolesAttr {
  name: string;
  description: string;
}
@Table({ tableName: "roles" })
export class Roles extends Model<Roles, RolesAttr> {
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
    type: DataType.STRING,
  })
  description: string;
}
