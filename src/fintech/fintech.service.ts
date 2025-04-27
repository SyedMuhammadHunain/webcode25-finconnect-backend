import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
  ) {}

  async getBalance(userId: string): Promise<{ balance: number }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { balance: user.balance };
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

    return { message: 'Transfer successful' };
  }

  async getTransactions(userId: string, page: number, pageSize: number) {
    const transactions = await this.transactionModel
      .find({
        $or: [{ sourceAccountId: userId }, { destinationAccountId: userId }],
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return transactions;
  }

  async getInvoice(userId: string, start: Date, end: Date) {
    const transactions = await this.transactionModel.find({
      $or: [{ sourceAccountId: userId }, { destinationAccountId: userId }],
      createdAt: { $gte: start, $lte: end },
    });

    const totalAmount = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    return {
      totalTransactions: transactions.length,
      totalAmount,
      transactions,
    };
  }
}
