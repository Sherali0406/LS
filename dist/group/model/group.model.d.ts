import { Model } from "sequelize-typescript";
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
    end_date: Date;
}
export declare class Groups extends Model<Groups, GroupsAttr> {
    id: number;
    name: string;
    start_date: string;
    days: boolean;
    start_time: number;
    end_time: number;
    end_date: Date;
    room_id: number;
    status: boolean;
    course_id: number;
    teacher_id: number;
    rooms: Rooms;
    courses: Courses;
    studentAttendances: StudentAttendance[];
    lesson: Lesson;
}
export {};
