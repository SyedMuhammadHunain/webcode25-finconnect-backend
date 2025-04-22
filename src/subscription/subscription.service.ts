// filepath: src/subscription/subscription.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { SubscriptionType } from 'src/common/enums/subscriptionType.enum';

@Injectable()
export class SubscriptionService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async subscribe(
    userId: string,
    subscriptionType: SubscriptionType,
  ): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isSubscribed = true;
    user.subscriptionType = subscriptionType;

    // Set subscription expiry (example: 30 days)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    user.subscriptionExpiry = expiryDate;

    await user.save();
  }

  async cancel(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isSubscribed = false;
    user.subscriptionType = SubscriptionType.BASIC; // Or a default value
    user.subscriptionExpiry = null;

    await user.save();
  }
}
