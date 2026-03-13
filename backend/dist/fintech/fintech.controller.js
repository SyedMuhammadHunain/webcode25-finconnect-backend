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
exports.FintechController = void 0;
const common_1 = require("@nestjs/common");
const fintech_service_1 = require("./fintech.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const fintech_transfer_dto_1 = require("../dtos/fintech-transfer.dto");
let FintechController = class FintechController {
    fintechService;
    constructor(fintechService) {
        this.fintechService = fintechService;
    }
    async getBalance(req) {
        const userId = req.user.sub;
        return this.fintechService.getBalance(userId);
    }
    async transferFunds(transferFundsDto) {
        const { sourceAccountId, destinationAccountId, amount } = transferFundsDto;
        return this.fintechService.transferFunds(sourceAccountId, destinationAccountId, amount);
    }
    async getTransactions(req, page = 1, pageSize = 10) {
        const userId = req.user.sub;
        return this.fintechService.getTransactions(userId, +page, +pageSize);
    }
    async getInvoice(req, start, end) {
        const userId = req.user.sub;
        return this.fintechService.getInvoice(userId, new Date(start), new Date(end));
    }
};
exports.FintechController = FintechController;
__decorate([
    (0, common_1.Get)('balance'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FintechController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Post)('transfer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fintech_transfer_dto_1.TransferFundsDto]),
    __metadata("design:returntype", Promise)
], FintechController.prototype, "transferFunds", null);
__decorate([
    (0, common_1.Get)('transactions'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FintechController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Get)('invoice'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('start')),
    __param(2, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], FintechController.prototype, "getInvoice", null);
exports.FintechController = FintechController = __decorate([
    (0, common_1.Controller)('api'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [fintech_service_1.FintechService])
], FintechController);
//# sourceMappingURL=fintech.controller.js.map