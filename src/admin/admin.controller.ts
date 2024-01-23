import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  BadRequestException,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./model/admin.model";
import { Response } from "express";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { CookieGetter } from "../decorators/cookieGetter.decorator";
import { AdminGuard } from "../guards/admin.guard";
import { findAdminDto } from "./dto/find-admin.dto";
import { AdminSelfGuard } from "../guards/admin_self.guard";
import { JwtGuard } from "../guards/jwt.guard";

@ApiTags("ADMIN")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "register Admin" })
  @ApiResponse({ status: 201, type: Admin })
  @Post("signup")
  registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  @ApiOperation({ summary: "login admin" })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: "logged out  admin" })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post("signout")
  logout(
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.logout(refresh_token, res);
  }

  // @UseGuards(AdminSelfGuard)
  // @UseGuards(JwtGuard)
  @Post(":id/refresh")
  refresh(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  // @UseGuards(AdminGuard)
  @Post("find")
  findAll(@Body() findUserDto: findAdminDto) {
    return this.adminService.findAll(findUserDto);
  }

  // @UseGuards(AdminGuard)
  // @UseGuards(AdminSelfGuard)
  // @UseGuards(JwtGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Admin> {
    return this.adminService.findOne(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: "Get All Admins" })
  @ApiResponse({ status: 200, description: "List of admins", type: [Admin] })
  @Get()
  getAllAdmins(
    @Query("page") page: number,
    @Query("limit") limit: number
  ): Promise<{admin:Admin[];total:number}> {
    return this.adminService.getAllAdmins(page,limit);
  }

  // @UseGuards(AdminGuard)
  // @UseGuards(AdminSelfGuard)
  // @UseGuards(JwtGuard)
  @ApiOperation({ summary: "Delete Admin by ID" })
  @Delete(":id")
  deleteAdmin(@Param("id") id: number) {
    return this.adminService.deleteAdmin(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }
}
