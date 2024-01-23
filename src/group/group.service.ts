import { Op } from "sequelize";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Groups } from "./model/group.model";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { CreateGroupDto } from "./dto/create-group.dto";
import { RoomsService } from "../rooms/rooms.service";
import { CoursesService } from "../courses/courses.service";
import { TeachersService } from "../teacher/teachers.service";
import { GetFreeRoomDto } from "./dto/free-room-dto";
import { Courses } from "../courses/model/course.model";
import { Rooms } from "../rooms/model/room.model";
import { Sequelize } from "sequelize-typescript";
import { getSelectedDaysFromDate } from "./dto/get-selected-dats";
import { LessonService } from "../lesson/lesson.service";

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Groups) private groupsRepo: typeof Groups,
    private readonly roomsService: RoomsService,
    private readonly coursesService: CoursesService,
    private readonly teacherService: TeachersService,
    private readonly lessonService: LessonService
  ) {}

  async createGroup(createGroupDto: CreateGroupDto) {
    if (createGroupDto.start_time >= createGroupDto.end_time) {
      throw new BadRequestException("end time must be greater than start time");
    }
    const room = await this.roomsService.findRoomById(createGroupDto.room_id);
    if (!room) {
      throw new BadRequestException("Room is not found");
    }

    const course = await this.coursesService.findCourseById(
      createGroupDto.course_id
    );
    if (!course) {
      throw new BadRequestException("Course is not found");
    }

    const teacher = await this.teacherService.findByTeacherId(
      createGroupDto.teacher_id
    );
    if (!teacher) {
      throw new BadRequestException("Teacher is not found");
    }

    const exist = await this.groupsRepo.findOne({
      where: {
        name: createGroupDto.name,
      },
    });

    if (exist) {
      throw new BadRequestException("Group is already exists");
    }

    const end_date = new Date(createGroupDto.start_date);
    end_date.setMonth(end_date.getMonth() + course.period);

    // const group = await this.groupsRepo.create({ ...createGroupDto, end_date });
    const group = await this.groupsRepo.create({ ...createGroupDto });

    const selectedDays = [];

    if (group.days) {
      selectedDays.push("monday", "wednesday", "friday");
    } else {
      selectedDays.push("tuesday", "thursday", "saturday");
    }

    const days = getSelectedDaysFromDate(
      selectedDays,
      group.start_date,
      course.period
    );

    group.end_date = days.at(-1);

    days.forEach(async (day, number) => {
      await this.lessonService.generateLesson(day);
    });

    return group;
  }

  async fetchAllGroups(page: number, limit: number) {
    const page1 = +page > 0 ? +page : 1;
    const limit1 = +limit > 0 ? +limit : null;

    const groups = await this.groupsRepo.findAll({
      offset: (page1 - 1) * limit1,
      limit: limit1,
      include: ["course", "room"],
    });

    const count = await this.groupsRepo.count();

    return { groups, count };
  }

  async fetchAvailableRooms(getFreeRoomDto: GetFreeRoomDto) {
    try {
      const groups = await Groups.findAll({
        where: {
          end_date: {
            [Op.gte]: getFreeRoomDto.start_date,
          },
          [Op.or]: [
            {
              [Op.and]: [
                {
                  start_time: {
                    [Op.lte]: getFreeRoomDto.start_time,
                  },
                },
                {
                  end_time: {
                    [Op.gte]: getFreeRoomDto.start_time,
                  },
                },
              ],
            },
            {
              [Op.and]: [
                {
                  start_time: {
                    [Op.lte]: getFreeRoomDto.end_time,
                  },
                },
                {
                  end_time: {
                    [Op.gte]: getFreeRoomDto.end_time,
                  },
                },
              ],
            },
            {
              [Op.and]: [
                {
                  start_time: {
                    [Op.gte]: getFreeRoomDto.start_time,
                  },
                },
                {
                  end_time: {
                    [Op.lte]: getFreeRoomDto.end_time,
                  },
                },
              ],
            },
          ],
          days: getFreeRoomDto.days,
        },
      });

      const busyRooms = groups.map((group) => group.room_id);
      //  const rooms = await this.roomsService.getAllRooms(busyRooms);

      const rooms = await Rooms.findAll({
        where: {
          id: {
            [Op.notIn]: busyRooms,
          },
        },
      });

      return rooms;
    } catch (error) {
      throw new BadRequestException("Error fetching available rooms");
    }
  }

  async fetchSingleGroup(id: string) {
    try {
      const group = await Groups.findOne({
        where: { id },
        include: [Courses, Rooms],
      });

      if (!group) {
        throw new BadRequestException("Group not found");
      }

      return { group };
    } catch (error) {
      throw new BadRequestException("Error fetching group");
    }
  }
  // async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Groups> {
  //   const groups = await this.groupsRepo.update(updateGroupDto, {
  //     where: { id },
  //     returning: true,
  //   });
  //   return groups[1][0].dataValues;
  // }

  async findAll(): Promise<Groups[]> {
    const groups = await this.groupsRepo.findAll({ include: { all: true } });
    return groups;
  }

  async remove(id: number) {
    const del = this.groupsRepo.destroy({ where: { id } });
    return del;
  }
}
