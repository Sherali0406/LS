import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { Admin } from "../../admin/model/admin.model";
import { Groups } from "../../group/model/group.model";
import { Students } from "../../students/model/student.model";

interface StudentAttendanceAttr {
  participated: boolean;
  date: string;
  group_id: number;
  lesson_id: number;
  student_id: number;
  comment: string;
  admin_id: number;
}

@Table({ tableName: "studentAttendance" })
export class StudentAttendance extends Model<
  StudentAttendance,
  StudentAttendanceAttr
> {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  participated: boolean;

  @Column({
    type: DataType.STRING,
  })
  date: string;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Groups)
  group_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  lesson_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Students)
  student_id: number;

  @Column({
    type: DataType.STRING,
  })
  comment: string;

  @Column({
    type: DataType.INTEGER,
  })
  @ForeignKey(() => Admin)
  admin_id: number;

  @BelongsTo(() => Groups)
  groups: Groups;

  @BelongsTo(() => Students)
  students: Students;

  @BelongsTo(() => Admin)
  admins: Admin;
}
