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
var StripeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const config_1 = require("@nestjs/config");
const common_2 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let StripeService = StripeService_1 = class StripeService {
    configService;
    userModel;
    stripe;
    logger = new common_1.Logger(StripeService_1.name);
    constructor(configService, userModel) {
        this.configService = configService;
        this.userModel = userModel;
        const stripeSecretKey = this.configService.get('STRIPE_SECRET_KEY');
        if (!stripeSecretKey) {
            this.logger.error('STRIPE_SECRET_KEY is not defined in the environment.');
            throw new Error('STRIPE_SECRET_KEY is not defined.');
        }
        this.stripe = new stripe_1.default(stripeSecretKey, {
            apiVersion: '2026-02-25.clover',
        });
    }
    async createCheckoutSession(userId, priceId) {
        try {
            const session = await this.stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `http://localhost:4242/success.html`,
                cancel_url: `http://localhost:4242/cancel.html`,
                client_reference_id: userId,
            });
            return session.url;
        }
        catch (error) {
            this.logger.error('Error creating session:', error);
            throw new common_2.InternalServerErrorException('Failed to create checkout session');
        }
    }
    async isSubscribed(userId) {
        try {
            const user = await this.userModel.findById(userId).lean().exec();
            if (!user) {
                this.logger.warn(`User not found: ${userId}`);
                return false;
            }
            return user.isSubscribed;
        }
        catch (error) {
            this.logger.error(`Error checking subscription for user ${userId}:`, error);
            return false;
        }
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = StripeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_1.Model])
], StripeService);
//# sourceMappingURL=stripe.service.js.map