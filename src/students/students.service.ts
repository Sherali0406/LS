import { JwtService } from "@nestjs/jwt";
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateStudentDto } from "./dto/create-student.dto";
import { Students } from "./model/student.model";
import * as bcrypt from "bcrypt";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { findStudentsDto } from "./dto/find-student-dto";
import { LoginStudentDto } from "./dto/login-student-dto";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Students) private studentsRepo: typeof Students,
    private readonly jwtService: JwtService
  ) {}

  async create(createStudentDto: CreateStudentDto, res: Response) {
    try {
      const student = await this.studentsRepo.findOne({
        where: { phone_number: createStudentDto.phone_number },
      });

      if (student) {
        throw new BadRequestException(
          "This phone number is already registered"
        );
      }

      if (createStudentDto.password !== createStudentDto.confirm_password) {
        throw new BadRequestException("Passwords did not match!");
      }

      const hashed_password = await bcrypt.hash(createStudentDto.password, 7);

      const newStudent = await this.studentsRepo.create({
        ...createStudentDto,
        role: "student",
        hashed_password: hashed_password,
      });

      const tokens = await this.getTokens(newStudent);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      // Update the student with the hashed refresh token
      const updatedStudent = await this.studentsRepo.update(
        { hashed_refresh_token },
        {
          where: { id: newStudent.id },
          returning: true,
        }
      );

      // Set the refresh token as a cookie
      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const response = {
        message: "Student registered",
        student: {
          id: newStudent.id,
          name: newStudent.name,
          surname: newStudent.surname,
          phone_number: newStudent.phone_number,
          hashed_password: newStudent.hashed_password,
          courses: newStudent.courses,
          groups: newStudent.groups,
          status: newStudent.status,
        },
        tokens,
      };

      return response;
    } catch (error) {
      throw new BadRequestException(
        "Failed to create a student: " + error.message
      );
    }
  }

  async getTokens(students: Students) {
    //generate new token
    const jwtPayload = {
      id: students.id,
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

  async login(loginStudentDto: LoginStudentDto, res: Response) {
    const { phone_number, password } = loginStudentDto;
    const student = await this.studentsRepo.findOne({
      where: { phone_number },
    });

    if (!student) {
      throw new BadRequestException("Student did not register!");
    }

    const isMatchPass = await bcrypt.compare(password, student.hashed_password);

    if (!isMatchPass) {
      throw new BadRequestException("Student did not register(pass)!");
    }

    const tokens = await this.getTokens(student);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateStudent = await this.studentsRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: student.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: "Student logged in",
      student: updateStudent[1][0],
      tokens,
    };
    return response;
  }

  async findByPhoneNumber(id: string): Promise<Students | null> {
    try {
      const student = await this.studentsRepo.findOne({
        where: { id, role: "student" },
        include: { all: true },
      });

      return student || null;
    } catch (error) {
      // Handle the error here, you can log it or re-throw it as needed.
      return null; // Return null in case of an error
    }
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto
  ): Promise<Students> {
    const [, [updatedStudent]] = await this.studentsRepo.update(
      updateStudentDto,
      {
        where: { id },
        returning: true,
      }
    );
    if (!updatedStudent) {
      throw new BadRequestException("Student not found or not updated");
    }
    return updatedStudent;
  }

  async findAll(
    findStudentsDto: findStudentsDto,
    page: number = 1,
    limit: number = 10
  ): Promise<{ students: Students[]; total: number }> {
    const where = { phone_number: findStudentsDto.phone_number };

    const offset = (page - 1) * limit;

    const students = await this.studentsRepo.findAll({
      where,
      limit,
      offset,
    });

    const total = await this.studentsRepo.count({ where });

    if (!students || students.length === 0) {
      throw new BadRequestException("Student not found");
    }

    return { students, total };
  }

  async getAllStudents(
    page: number = 1,
    limit: number = 10
  ): Promise<{ students: Students[]; total: number }> {
    const offset = (page - 1) * limit;

    const students = await this.studentsRepo.findAll({
      limit,
      offset,
      include: { all: true },
    });

    const total = await this.studentsRepo.count();

    return { students, total };
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException("Invalid ID");
    }
    const student = await this.studentsRepo.findOne({ where: { id } });

    if (!student) {
      throw new BadRequestException("Student is not found by the given ID");
    }

    await student.destroy();

    return { message: "Deleted successfully" };
  }

  async logout(refresh_token: string, res: Response) {
    const studentData = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY_AD,
    });

    if (!studentData) {
      throw new ForbiddenException("student not found");
    }

    const updateStudent = await this.studentsRepo.update(
      { hashed_refresh_token: null }, //student log out bolad
      { where: { id: studentData.id }, returning: true }
    );

    res.clearCookie("refresh_token"); //logout jarayonini tugatadi

    const response = {
      message: "Student logged out successfully",
      student: updateStudent[1][0],
    };
    return response;
  }
}
