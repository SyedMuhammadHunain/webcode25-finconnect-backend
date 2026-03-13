import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { SubscriptionType } from 'src/common/enums/subscriptionType.enum';
export declare class SubscriptionService {
    private userModel;
    constructor(userModel: Model<User>);
    subscribe(userId: string, subscriptionType: SubscriptionType, amount: number): Promise<void>;
    cancel(userId: string): Promise<void>;
    adminCancelSubscription(userId: string): Promise<void>;
}
