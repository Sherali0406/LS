import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Groups } from "../../group/model/group.model";

interface LessonAttr {
  title: string;
  // date: string;
  group_id: number;
  // number:number;
  // duration:number;
  // paid:boolean;
  teacher: string;
  pass: boolean;
  description: string;
  admin: string;
}

@Table({ tableName: "lessons" })
export class Lesson extends Model<Lesson, LessonAttr> {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title: string;

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false,
  // })
  // date: string;

  @ForeignKey(() => Groups)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  group_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  teacher: string;

  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // number: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  pass: boolean;

  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // duration: number;

  // @Column({
  //   type: DataType.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: true,
  // })
  // paid: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  description: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  admin: string | null;

  @BelongsTo(() => Groups)
  groups: Groups;
}
