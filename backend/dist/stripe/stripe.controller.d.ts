import { StripeService } from './stripe.service';
import { CustomRequest } from 'src/common/interfaces/custom-request.interface';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createCheckoutSession(priceId: string, req: CustomRequest): Promise<{
        url: string;
    }>;
}
