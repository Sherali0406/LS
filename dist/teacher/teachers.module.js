"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersModule = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const teachers_service_1 = require("./teachers.service");
const teachers_controller_1 = require("./teachers.controller");
const teacher_model_1 = require("./model/teacher.model");
const jwt_1 = require("@nestjs/jwt");
let TeachersModule = exports.TeachersModule = class TeachersModule {
};
exports.TeachersModule = TeachersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([teacher_model_1.Teachers]),
            jwt_1.JwtModule.register({
                secret: process.env.ACCESS_TOKEN_KEY_AD,
                signOptions: { expiresIn: "24h" },
            }),
        ],
        controllers: [teachers_controller_1.TeachersController],
        providers: [teachers_service_1.TeachersService],
        exports: [jwt_1.JwtModule],
    })
], TeachersModule);
//# sourceMappingURL=teachers.module.js.map