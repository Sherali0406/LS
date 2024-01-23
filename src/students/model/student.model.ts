import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Groups } from "../../group/model/group.model";
import { StudentAttendance } from "../../student_attendance/model/student_attendance.model";

interface StudentsAttr {
  name: string;
  surname: string;
  phone_number: string;
  password: string;
  role:string;
  courses: string;
  groups: string;
  status: string;
  hashed_password: string;
  hashed_refresh_token:string

}
@Table({ tableName: "students" })
export class Students extends Model<Students, StudentsAttr> {
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
  surname: string;

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
  password: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  courses: string;

  @Column({
    type: DataType.STRING,
  })
  groups: string;
  @Column({
    type: DataType.STRING,
  })
  status: string;

  @HasMany(() => StudentAttendance)
  studentAttendances: StudentAttendance[];
}
