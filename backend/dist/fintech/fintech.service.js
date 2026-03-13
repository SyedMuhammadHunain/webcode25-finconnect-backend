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
exports.FintechService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const transaction_schema_1 = require("../schemas/transaction.schema");
let FintechService = class FintechService {
    userModel;
    transactionModel;
    cacheManager;
    constructor(userModel, transactionModel, cacheManager) {
        this.userModel = userModel;
        this.transactionModel = transactionModel;
        this.cacheManager = cacheManager;
    }
    async getUserCacheVersion(userId) {
        const key = `cache_version_${userId}`;
        let version = await this.cacheManager.get(key);
        if (!version) {
            version = Date.now().toString();
            await this.cacheManager.set(key, version, 86400000);
        }
        return version;
    }
    async invalidateUserCache(userId) {
        await this.cacheManager.set(`cache_version_${userId}`, Date.now().toString(), 86400000);
    }
    async getBalance(userId) {
        const version = await this.getUserCacheVersion(userId);
        const cacheKey = `balance_${userId}_v${version}`;
        const cachedBalance = await this.cacheManager.get(cacheKey);
        if (cachedBalance) {
            return cachedBalance;
        }
        const user = await this.userModel.findById(userId).lean().exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const result = { balance: user.balance };
        await this.cacheManager.set(cacheKey, result);
        return result;
    }
    async transferFunds(sourceAccountId, destinationAccountId, amount) {
        const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            throw new common_1.BadRequestException('Transfer amount must be a valid number greater than zero');
        }
        const sourceUser = await this.userModel.findById(sourceAccountId);
        const destinationUser = await this.userModel.findById(destinationAccountId);
        if (!sourceUser || !destinationUser) {
            throw new common_1.NotFoundException('Source or destination account not found');
        }
        if (sourceUser.balance < numericAmount) {
            throw new common_1.BadRequestException('Insufficient balance');
        }
        sourceUser.balance -= numericAmount;
        destinationUser.balance += numericAmount;
        await sourceUser.save();
        await destinationUser.save();
        await this.transactionModel.create({
            sourceAccountId,
            destinationAccountId,
            amount: numericAmount,
            description: `Transfer of $${numericAmount} from ${sourceUser.username} to ${destinationUser.username}`,
        });
        await this.invalidateUserCache(sourceAccountId);
        await this.invalidateUserCache(destinationAccountId);
        return { message: 'Transfer successful' };
    }
    async getTransactions(userId, page, pageSize) {
        const version = await this.getUserCacheVersion(userId);
        const cacheKey = `transactions_${userId}_${page}_${pageSize}_v${version}`;
        const cachedTransactions = await this.cacheManager.get(cacheKey);
        if (cachedTransactions) {
            return cachedTransactions;
        }
        const transactions = await this.transactionModel
            .find({
            $or: [{ sourceAccountId: userId }, { destinationAccountId: userId }],
        })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ createdAt: -1 })
            .lean()
            .exec();
        await this.cacheManager.set(cacheKey, transactions);
        return transactions;
    }
    async getInvoice(userId, start, end) {
        const version = await this.getUserCacheVersion(userId);
        const cacheKey = `invoice_${userId}_${start.toISOString()}_${end.toISOString()}_v${version}`;
        const cachedInvoice = await this.cacheManager.get(cacheKey);
        if (cachedInvoice) {
            return cachedInvoice;
        }
        const transactions = await this.transactionModel.find({
            $or: [{ sourceAccountId: userId }, { destinationAccountId: userId }],
            createdAt: { $gte: start, $lte: end },
        }).lean().exec();
        const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        const result = {
            totalTransactions: transactions.length,
            totalAmount,
            transactions,
        };
        await this.cacheManager.set(cacheKey, result);
        return result;
    }
};
exports.FintechService = FintechService;
exports.FintechService = FintechService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model, Object])
], FintechService);
//# sourceMappingURL=fintech.service.js.map