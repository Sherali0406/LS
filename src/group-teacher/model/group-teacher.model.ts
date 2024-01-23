import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

interface GroupTeacherAttr {
  group: string;
  teacher: string;
  is_available: boolean;
}
@Table({ tableName: "group-teacher" })
export class GroupTeacher extends Model<GroupTeacher, GroupTeacherAttr> {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  group: string;

  @Column({
    type: DataType.STRING,
  })
  teacher: string;

}
