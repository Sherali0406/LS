"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupTeachersModule = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const group_teacher_controller_1 = require("./group-teacher.controller");
const group_teacher_service_1 = require("./group-teacher.service");
const group_teacher_model_1 = require("./model/group-teacher.model");
let GroupTeachersModule = exports.GroupTeachersModule = class GroupTeachersModule {
};
exports.GroupTeachersModule = GroupTeachersModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([group_teacher_model_1.GroupTeacher])],
        controllers: [group_teacher_controller_1.GroupTeachersController],
        providers: [group_teacher_service_1.GroupTeachersService],
    })
], GroupTeachersModule);
//# sourceMappingURL=group-teacher.module.js.map