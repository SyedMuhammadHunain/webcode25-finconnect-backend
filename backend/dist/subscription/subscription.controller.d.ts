import { SubscriptionService } from './subscription.service';
import { SubscriptionType } from 'src/common/enums/subscriptionType.enum';
import { CustomRequest } from 'src/common/interfaces/custom-request.interface';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    subscribe(req: CustomRequest, body: {
        subscriptionType: SubscriptionType;
        amount: number;
    }): Promise<{
        message: string;
    }>;
    cancel(req: CustomRequest): Promise<{
        message: string;
    }>;
}
