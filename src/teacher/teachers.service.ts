import { JwtService } from "@nestjs/jwt";
import { Op } from "sequelize";
import { FindTeacherDto } from "./dto/find-teacher-dto";
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { Teachers } from "./model/teacher.model";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Response } from "express";
import { LoginTeacherDto } from "./dto/login-teacher-dto";

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teachers) private teachersRepo: typeof Teachers,
    private readonly jwtService: JwtService
  ) {}

  async create(createTeacherDto: CreateTeacherDto, res: Response) {
    try {
      const teacher = await this.teachersRepo.findOne({
        where: { phone_number: createTeacherDto.phone_number },
      });

      if (teacher) {
        throw new BadRequestException(
          "This phone number is already registered"
        );
      }

      if (createTeacherDto.password !== createTeacherDto.confirm_password) {
        throw new BadRequestException("Passwords did not match!");
      }

      const hashed_password = await bcrypt.hash(createTeacherDto.password, 7);
      const newTeacher = await this.teachersRepo.create({
        ...createTeacherDto,
        role: "teacher",
        hashed_password: hashed_password,
      });

      const tokens = await this.getTokens(newTeacher);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      const updatedTeacher = await this.teachersRepo.update(
        { hashed_refresh_token },
        {
          where: { id: newTeacher.id },
          returning: true,
        }
      );

      // Set the refresh token as a cookie
      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const response = {
        message: "Teacher registered",
        teacher: {
          id: newTeacher.id,
          name: newTeacher.name,
          surname: newTeacher.surname,
          image: newTeacher.image,
          course: newTeacher.course,
          hashed_password: newTeacher.hashed_password,
          active_groups: newTeacher.active_groups,
          status: newTeacher.status,
          createdAt: newTeacher.createdAt,
          updatedAt: newTeacher.updatedAt,
        },
        tokens,
      };

      return response;
    } catch (error) {
      throw new BadRequestException(
        "Failed to create a teacher: " + error.message
      );
    }
  }

  async getTokens(teachers: Teachers) {
    //generate new token
    const jwtPayload = {
      id: teachers.id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY_AD,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY_AD,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(loginTeacherDto: LoginTeacherDto, res: Response) {
    const { phone_number, password } = loginTeacherDto;
    const teacher = await this.teachersRepo.findOne({
      where: { phone_number },
    });

    if (!teacher) {
      throw new BadRequestException("Teacher did not register!");
    }

    const isMatchPass = await bcrypt.compare(password, teacher.hashed_password);

    if (!isMatchPass) {
      throw new BadRequestException("Teacher did not register(pass)!");
    }

    const tokens = await this.getTokens(teacher);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateTeacher = await this.teachersRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: teacher.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: "Teacher logged in",
      teacher: updateTeacher[1][0],
      tokens,
    };
    return response;
  }

  async findByTeacherId(id: number): Promise<Teachers> {
    return this.teachersRepo.findOne({
      where: { id, role: "teacher" },
      include: { all: true },
    });
  }

  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto
  ): Promise<Teachers> {
    const teachers = await this.teachersRepo.update(updateTeacherDto, {
      where: { id },
      returning: true,
    });
    return teachers[1][0].dataValues;
  }

  async findAll(FindTeacherDto: FindTeacherDto) {
    const where = {};
    if (FindTeacherDto.phone_number) {
      where["phone_number"] = {
        [Op.like]: `%${FindTeacherDto.phone_number}%`,
      };
      console.log("found");
    }

    const teachers = await Teachers.findAll({ where });
    if (!teachers) {
      throw new BadRequestException("teacher is not found");
    }
    return teachers;
  }

  async getAllTeachers(
    page: number = 1,
    limit: number = 10
  ): Promise<{ teachers: Teachers[]; total: number }> {
    const offset = (page - 1) * limit;

    const teachers = await this.teachersRepo.findAll({
      limit,
      offset,
      include: { all: true },
    });
    const total = await this.teachersRepo.count();
    return { teachers, total };
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException("Invalid ID");
    }
    const teacher = await this.teachersRepo.findOne({ where: { id } });

    if (!teacher) {
      throw new BadRequestException(
        "Teacher is not found by the given ID",
      );
    }

    await teacher.destroy();

    return { message: "Deleted successfully" };
  }

  async logout(refresh_token: string, res: Response) {
    const teacherData = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY_AD,
    });

    if (!teacherData) {
      throw new ForbiddenException("teacher not found");
    }

    const updateTeacher = await this.teachersRepo.update(
      { hashed_refresh_token: null }, //teacher log out bolad
      { where: { id: teacherData.id }, returning: true }
    );

    res.clearCookie("refresh_token"); //logout jarayonini tugatadi

    const response = {
      message: "Teacher logged out successfully",
      teacher: updateTeacher[1][0],
    };
    return response;
  }

}
