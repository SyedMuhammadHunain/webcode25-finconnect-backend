import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { TransactionDocument } from 'src/schemas/transaction.schema';
export declare class FintechService {
    private userModel;
    private transactionModel;
    private cacheManager;
    constructor(userModel: Model<UserDocument>, transactionModel: Model<TransactionDocument>, cacheManager: Cache);
    private getUserCacheVersion;
    private invalidateUserCache;
    getBalance(userId: string): Promise<{
        balance: number;
    }>;
    transferFunds(sourceAccountId: string, destinationAccountId: string, amount: number | string): Promise<{
        message: string;
    }>;
    getTransactions(userId: string, page: number, pageSize: number): Promise<any[]>;
    getInvoice(userId: string, start: Date, end: Date): Promise<any>;
}
