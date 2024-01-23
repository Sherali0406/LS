import { UpdateAdminDto } from "./dto/update-admin.dto";
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
import { Admin } from "./model/admin.model";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { findAdminDto } from "./dto/find-admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    private readonly jwtService: JwtService
  ) {}

  async registration(CreateAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminRepo.findOne({
      where: { first_name: CreateAdminDto.first_name },
    });

    if (admin) {
      throw new BadRequestException("Admin name already exists!");
    }

    if (CreateAdminDto.password !== CreateAdminDto.confirm_password) {
      throw new BadRequestException("Passwords is not match!");
    }

    const hashed_password = await bcrypt.hash(CreateAdminDto.password, 7);
    const newAdmin = await this.adminRepo.create({
      ...CreateAdminDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(newAdmin);

    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
        activation_link: uniqueKey,
      },
      {
        where: { id: newAdmin.id },
        returning: true,
      }
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: "Admin registred",
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(admin: Admin) {
    //generate new token
    const jwtPayload = {
      id: admin.id,
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

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { phone_number, password } = loginAdminDto;
    const admin = await this.adminRepo.findOne({ where: { phone_number } });

    if (!admin) {
      throw new BadRequestException("Admin did not register!");
    }

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);

    if (!isMatchPass) {
      throw new BadRequestException("Admin did not register(pass)!");
    }

    const tokens = await this.getTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateAdmin = await this.adminRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: admin.id }, returning: true }
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: "Admin logged in",
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async logout(refresh_token: string, res: Response) {
    const adminData = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY_AD,
    });

    if (!adminData) {
      throw new ForbiddenException("admin not found");
    }

    const updateAdmin = await this.adminRepo.update(
      { hashed_refresh_token: null }, //admin log out bolad
      { where: { id: adminData.id }, returning: true }
    );

    res.clearCookie("refresh_token"); //logout jarayonini tugatadi

    const response = {
      message: "Admin logged out successfully",
      admin: updateAdmin[1][0],
    };
    return response;
  }

  async refreshToken(admin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (admin_id != decodedToken["id"]) {
      throw new BadRequestException("admin not found");
    }

    const admin = await this.adminRepo.findOne({ where: { id: admin_id } });
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException("admin not found");
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden!!!!!");
    }

    const tokens = await this.getTokens(admin); //token generatsiya qilish

    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
      },
      {
        where: { id: admin.id },
        returning: true,
      }
    );

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: "Admin",
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async getAllAdmins(
    page: number = 1,
    limit: number = 10
  ): Promise<{ admin: Admin[]; total: number }> {
    const offset = (page - 1) * limit;

    const admin = await this.adminRepo.findAll({
      limit,
      offset,
      include: { all: true },
    });

    const total = await this.adminRepo.count();

    return { admin, total };
  }

  async remove(id: string) {
    if (!id) {
      throw new BadRequestException("Invalid ID");
    }
    const student = await this.adminRepo.findOne({ where: { id } });

    if (!student) {
      throw new BadRequestException("Student is not found by the given ID");
    }

    await student.destroy();

    return { message: "Deleted successfully" };
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return admin;
  }

  async update(id: number, UpdateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admins = await this.adminRepo.update(UpdateAdminDto, {
      where: { id },
      returning: true,
    });
    return admins[1][0].dataValues;
  }

  async findAll(
    findAdminDto: findAdminDto,
    page: number = 1,
    limit: number = 10
  ): Promise<{ admin: Admin[]; total: number }> {
    const where = { phone_number: findAdminDto.phone_number };

    const offset = (page - 1) * limit;

    const admin = await this.adminRepo.findAll({
      where,
      limit,
      offset,
    });

    const total = await this.adminRepo.count({ where });

    if (!admin || admin.length === 0) {
      throw new BadRequestException("Student not found");
    }

    return { admin, total };
  }

  async deleteAdmin(id: number) {
    if (!id) {
      throw new BadRequestException("Invalid ID");
    }
    const admin = await this.adminRepo.findOne({ where: { id } });

    if (!admin) {
      throw new BadRequestException("Admin is not found by the given ID");
    }
    await admin.destroy();
    return { message: "Admin deleted" };
  }
}
