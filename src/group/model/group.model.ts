import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Courses } from "../../courses/model/course.model";
import { Lesson } from "../../lesson/model/lesson.model";
import { Rooms } from "../../rooms/model/room.model";
import { StudentAttendance } from "../../student_attendance/model/student_attendance.model";

interface GroupsAttr {
  name: string;
  start_date: string;
  days: boolean;
  start_time: number;
  end_time: number;
  room_id: number;
  status: boolean;
  course_id: number;
  teacher_id: number;
  end_date: Date; // Add the end_date field
}

@Table({ tableName: "groups" })
export class Groups extends Model<Groups, GroupsAttr> {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  start_date: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  days: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  start_time: number;

  @Column({
    type: DataType.INTEGER,
  })
  end_time: number;

  @Column({
    type: DataType.DATE, // Change the data type to DATE for end_date
  })
  end_date: Date; // Define the end_date field

  @ForeignKey(() => Rooms)
  @Column({
    type: DataType.INTEGER,
  })
  room_id: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  status: boolean;

  @ForeignKey(() => Courses)
  @Column({
    type: DataType.INTEGER,
  })
  course_id: number;
 
  @Column({
    type: DataType.INTEGER,
  })
  teacher_id: number;

  @BelongsTo(() => Rooms)
  rooms: Rooms;

  @BelongsTo(() => Courses)
  courses: Courses;

  @HasMany(()=>StudentAttendance)
  studentAttendances:StudentAttendance[]

  @HasMany(()=>Lesson)
  lesson:Lesson
}
