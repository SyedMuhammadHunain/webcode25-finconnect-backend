import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
export declare class StripeService {
    private configService;
    private readonly userModel;
    private stripe;
    private readonly logger;
    constructor(configService: ConfigService, userModel: Model<User>);
    createCheckoutSession(userId: string, priceId: string): Promise<string | null>;
    isSubscribed(userId: string): Promise<boolean>;
}
