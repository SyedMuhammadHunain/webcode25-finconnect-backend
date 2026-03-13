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
exports.StripeController = void 0;
const common_1 = require("@nestjs/common");
const stripe_service_1 = require("./stripe.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let StripeController = class StripeController {
    stripeService;
    constructor(stripeService) {
        this.stripeService = stripeService;
    }
    async createCheckoutSession(priceId, req) {
        try {
            const userId = req.user.sub;
            const sessionUrl = await this.stripeService.createCheckoutSession(userId, priceId);
            if (!sessionUrl) {
                throw new common_1.HttpException('Failed to create checkout session', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return { url: sessionUrl };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.StripeController = StripeController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    (0, common_1.Get)('create-checkout-session'),
    __param(0, (0, common_1.Query)('priceId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createCheckoutSession", null);
exports.StripeController = StripeController = __decorate([
    (0, common_1.Controller)('api/subscription/'),
    __metadata("design:paramtypes", [stripe_service_1.StripeService])
], StripeController);
//# sourceMappingURL=stripe.controller.js.map