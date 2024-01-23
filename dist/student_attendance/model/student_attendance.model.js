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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAttendance = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const admin_model_1 = require("../../admin/model/admin.model");
const group_model_1 = require("../../group/model/group.model");
const student_model_1 = require("../../students/model/student.model");
let StudentAttendance = exports.StudentAttendance = class StudentAttendance extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        unique: true,
    }),
    __metadata("design:type", Number)
], StudentAttendance.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
    }),
    __metadata("design:type", Boolean)
], StudentAttendance.prototype, "participated", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], StudentAttendance.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => group_model_1.Groups),
    __metadata("design:type", Number)
], StudentAttendance.prototype, "group_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], StudentAttendance.prototype, "lesson_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => student_model_1.Students),
    __metadata("design:type", Number)
], StudentAttendance.prototype, "student_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], StudentAttendance.prototype, "comment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => admin_model_1.Admin),
    __metadata("design:type", Number)
], StudentAttendance.prototype, "admin_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => group_model_1.Groups),
    __metadata("design:type", group_model_1.Groups)
], StudentAttendance.prototype, "groups", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => student_model_1.Students),
    __metadata("design:type", student_model_1.Students)
], StudentAttendance.prototype, "students", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => admin_model_1.Admin),
    __metadata("design:type", admin_model_1.Admin)
], StudentAttendance.prototype, "admins", void 0);
exports.StudentAttendance = StudentAttendance = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "studentAttendance" })
], StudentAttendance);
//# sourceMappingURL=student_attendance.model.js.map