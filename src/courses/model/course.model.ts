import { Groups } from './../../group/model/group.model';
import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";

interface CoursesAttr {
  name: string;
  price: string;
  period: number;
  teacher_amount: number;
}
@Table({ tableName: "courses" })
export class Courses extends Model<Courses, CoursesAttr> {
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
  price: string;

  @Column({
    type: DataType.INTEGER,
  })
  period: number;

  @Column({
    type: DataType.INTEGER,
  })
  teacher_amount: number;

  @HasMany(() => Groups)
  groups: Groups[];
}
