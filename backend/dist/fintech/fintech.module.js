"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FintechModule = void 0;
const common_1 = require("@nestjs/common");
const fintech_service_1 = require("./fintech.service");
const fintech_controller_1 = require("./fintech.controller");
const user_module_1 = require("../user/user.module");
const transaction_module_1 = require("../transaction/transaction.module");
const jwt_config_1 = require("../config/jwt.config");
let FintechModule = class FintechModule {
};
exports.FintechModule = FintechModule;
exports.FintechModule = FintechModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, transaction_module_1.TransactionModule, jwt_config_1.JwtConfig],
        controllers: [fintech_controller_1.FintechController],
        providers: [fintech_service_1.FintechService],
    })
], FintechModule);
//# sourceMappingURL=fintech.module.js.map