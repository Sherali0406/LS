import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

interface GroupStudentAttr {
  group: string;
  student_phone: string;
}
@Table({ tableName: "group-student" })
export class GroupStudents extends Model<GroupStudents, GroupStudentAttr> {
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
  student_phone: string;
}
