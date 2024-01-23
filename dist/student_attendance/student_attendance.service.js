"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAttendanceService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const student_attendance_model_1 = require("./model/student_attendance.model");
const group_service_1 = require("../group/group.service");
const common_2 = require("@nestjs/common");
let StudentAttendanceService = exports.StudentAttendanceService = class StudentAttendanceService {
    constructor(studentAttendanceRepo, groupsService) {
        this.studentAttendanceRepo = studentAttendanceRepo;
        this.groupsService = groupsService;
    }
    async create(createStudentAttendanceDto) {
        try {
            const exist = await this.studentAttendanceRepo.findOne({
                where: {
                    participated: createStudentAttendanceDto.participated,
                },
            });
            if (exist) {
                throw new common_2.BadRequestException("This Student is participated");
            }
            const studentAttendance = await this.studentAttendanceRepo.create(createStudentAttendanceDto);
            return studentAttendance;
        }
        catch (error) {
            console.log(error);
            throw new common_2.BadRequestException("Bad request");
        }
    }
    findAll() {
        return `This action returns all studentAttendance`;
    }
    findOne(id) {
        return `This action returns a #${id} studentAttendance`;
    }
    update(id, updateStudentAttendanceDto) {
        return `This action updates a #${id} studentAttendance`;
    }
    remove(id) {
        return `This action removes a #${id} studentAttendance`;
    }
};
exports.StudentAttendanceService = StudentAttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(student_attendance_model_1.StudentAttendance)),
    __metadata("design:paramtypes", [Object, group_service_1.GroupsService])
], StudentAttendanceService);
//# sourceMappingURL=student_attendance.service.js.map