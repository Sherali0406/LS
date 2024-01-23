"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectorsModule = void 0;
const director_service_1 = require("./director.service");
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const director_model_1 = require("./model/director.model");
const director_controller_1 = require("./director.controller");
let DirectorsModule = exports.DirectorsModule = class DirectorsModule {
};
exports.DirectorsModule = DirectorsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([director_model_1.Director])],
        controllers: [director_controller_1.DirectorsController],
        providers: [director_service_1.DirectorsService],
    })
], DirectorsModule);
//# sourceMappingURL=director.module.js.map