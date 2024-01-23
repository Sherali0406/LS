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
exports.Groups = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const course_model_1 = require("../../courses/model/course.model");
const lesson_model_1 = require("../../lesson/model/lesson.model");
const room_model_1 = require("../../rooms/model/room.model");
const student_attendance_model_1 = require("../../student_attendance/model/student_attendance.model");
let Groups = exports.Groups = class Groups extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        unique: true,
    }),
    __metadata("design:type", Number)
], Groups.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Groups.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Groups.prototype, "start_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
    }),
    __metadata("design:type", Boolean)
], Groups.prototype, "days", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Groups.prototype, "start_time", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Groups.prototype, "end_time", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], Groups.prototype, "end_date", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => room_model_1.Rooms),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Groups.prototype, "room_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
    }),
    __metadata("design:type", Boolean)
], Groups.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_model_1.Courses),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Groups.prototype, "course_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Groups.prototype, "teacher_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => room_model_1.Rooms),
    __metadata("design:type", room_model_1.Rooms)
], Groups.prototype, "rooms", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_model_1.Courses),
    __metadata("design:type", course_model_1.Courses)
], Groups.prototype, "courses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => student_attendance_model_1.StudentAttendance),
    __metadata("design:type", Array)
], Groups.prototype, "studentAttendances", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => lesson_model_1.Lesson),
    __metadata("design:type", lesson_model_1.Lesson)
], Groups.prototype, "lesson", void 0);
exports.Groups = Groups = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "groups" })
], Groups);
//# sourceMappingURL=group.model.js.map