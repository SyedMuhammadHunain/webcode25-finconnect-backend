import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import {
  Transaction,
  TransactionDocument,
} from 'src/schemas/transaction.schema';

@Injectable()
export class FintechService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  // proper cache-invalidation: Tracking a cache version per user
  // When a transfer happens, we just bump the version and all old cache keys become invisible!
  private async getUserCacheVersion(userId: string): Promise<string> {
    const key = `cache_version_${userId}`;
    let version = await this.cacheManager.get<string>(key);
    if (!version) {
      version = Date.now().toString();
      await this.cacheManager.set(key, version, 86400000); // store for a while
    }
    return version;
  }

  private async invalidateUserCache(userId: string): Promise<void> {
    await this.cacheManager.set(`cache_version_${userId}`, Date.now().toString(), 86400000);
  }

  async getBalance(userId: string): Promise<{ balance: number }> {
    const version = await this.getUserCacheVersion(userId);
    const cacheKey = `balance_${userId}_v${version}`;
    const cachedBalance = await this.cacheManager.get<{ balance: number }>(cacheKey);

    if (cachedBalance) {
      return cachedBalance;
    }

    const user = await this.userModel.findById(userId).lean().exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const result = { balance: user.balance };
    await this.cacheManager.set(cacheKey, result); // Use default TTL from module
    return result;
  }

  async transferFunds(
    sourceAccountId: string,
    destinationAccountId: string,
    amount: number | string, // <- allow string just in case
  ): Promise<{ message: string }> {
    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new BadRequestException(
        'Transfer amount must be a valid number greater than zero',
      );
    }

    const sourceUser = await this.userModel.findById(sourceAccountId);
    const destinationUser = await this.userModel.findById(destinationAccountId);

    if (!sourceUser || !destinationUser) {
      throw new NotFoundException('Source or destination account not found');
    }

    if (sourceUser.balance < numericAmount) {
      throw new BadRequestException('Insufficient balance');
    }

    // Perform the transfer
    sourceUser.balance -= numericAmount;
    destinationUser.balance += numericAmount;
    await sourceUser.save();
    await destinationUser.save();

    // Log the transaction
    await this.transactionModel.create({
      sourceAccountId,
      destinationAccountId,
      amount: numericAmount,
      description: `Transfer of $${numericAmount} from ${sourceUser.username} to ${destinationUser.username}`,
    });

    // Invalidate caches instantly for both users after a transfer modifies their balances
    // Bumping the user cache version instantly invalidates ALL paginated transaction caches and balances
    await this.invalidateUserCache(sourceAccountId);
    await this.invalidateUserCache(destinationAccountId);

    return { message: 'Transfer successful' };
  }

  async getTransactions(userId: string, page: number, pageSize: number) {
    const version = await this.getUserCacheVersion(userId);
    const cacheKey = `transactions_${userId}_${page}_${pageSize}_v${version}`;
    const cachedTransactions = await this.cacheManager.get<any[]>(cacheKey);

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

  async getInvoice(userId: string, start: Date, end: Date) {
    const version = await this.getUserCacheVersion(userId);
    const cacheKey = `invoice_${userId}_${start.toISOString()}_${end.toISOString()}_v${version}`;
    const cachedInvoice = await this.cacheManager.get<any>(cacheKey);

    if (cachedInvoice) {
      return cachedInvoice;
    }

    const transactions = await this.transactionModel.find({
      $or: [{ sourceAccountId: userId }, { destinationAccountId: userId }],
      createdAt: { $gte: start, $lte: end },
    }).lean().exec();

    const totalAmount = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    const result = {
      totalTransactions: transactions.length,
      totalAmount,
      transactions,
    };

    await this.cacheManager.set(cacheKey, result);
    return result;
  }
}
