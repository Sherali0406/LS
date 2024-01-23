export class Teacher {}
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

interface TeachersAttr {
  name: string;
  surname: string;
  role:string;
  phone_number: string;
  password: string;
  hashed_password: string;
  hashed_refresh_token: string;
  image: string;
  course: string;
  active_groups: string;
  status: string;
}
@Table({ tableName: "teachers" })
export class Teachers extends Model<Teachers, TeachersAttr> {
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
  image: string;
  @Column({
    type: DataType.STRING,
  })
  course: string;
  @Column({
    type: DataType.STRING,
  })
  active_groups: string;
  @Column({
    type: DataType.STRING,
  })
  status: string;
}
