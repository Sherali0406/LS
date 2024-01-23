import { StudentAttendance } from "../../student_attendance/model/student_attendance.model";
import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";

interface AdminAttr {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: string;
  password: string;
  confirm_password: string;
  hashed_password: string;
  hashed_refresh_token: string;
}
@Table({ tableName: "admin" })
export class Admin extends Model<Admin, AdminAttr> {
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
  email: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  role: string;

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
  activation_link: string;

  @HasMany(() =>StudentAttendance)
  studentAttendances: StudentAttendance[];
}
