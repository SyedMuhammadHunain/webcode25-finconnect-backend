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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const subscriptionType_enum_1 = require("../common/enums/subscriptionType.enum");
let SubscriptionService = class SubscriptionService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async subscribe(userId, subscriptionType, amount) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.isSubscribed = true;
        user.subscriptionType = subscriptionType;
        user.subscriptionAmount = amount;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);
        user.subscriptionExpiry = expiryDate;
        await user.save();
    }
    async cancel(userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.isSubscribed = false;
        user.subscriptionType = subscriptionType_enum_1.SubscriptionType.BASIC;
        user.subscriptionExpiry = null;
        await user.save();
    }
    async adminCancelSubscription(userId) {
        return this.cancel(userId);
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map