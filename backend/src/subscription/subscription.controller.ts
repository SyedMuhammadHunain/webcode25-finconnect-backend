// filepath: src/subscription/subscription.controller.ts
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SubscriptionType } from 'src/common/enums/subscriptionType.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { CustomRequest } from 'src/common/interfaces/custom-request.interface';

import { StripeService } from 'src/stripe/stripe.service';

@Controller('api/subscriptions')
@UseGuards(AuthGuard)
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly stripeService: StripeService,
  ) { }

  @Post('subscribe')
  async subscribe(
    @Req() req: CustomRequest,
    @Body() body: { subscriptionType: SubscriptionType; amount: number },
  ): Promise<{ message: string; url?: string }> {
    const userId = req.user.sub;

    // Map subscription type to a placeholder price ID
    // In a real app, these would be fetched from a config or database
    const priceMap: Record<SubscriptionType, string> = {
      [SubscriptionType.BASIC]: 'price_1RGHu25t8kNCoSjhA1B1B1B1', // Use real ones if available
      [SubscriptionType.STANDARD]: 'price_1RGHu25t8kNCoSjhA2B2B2B2',
      [SubscriptionType.PREMIUM]: 'price_1RGHu25t8kNCoSjhA3B3B3B3',
    };

    const priceId = priceMap[body.subscriptionType];
    const sessionUrl = await this.stripeService.createCheckoutSession(
      userId,
      priceId,
    );

    return {
      message: `Checkout session created for ${body.subscriptionType}`,
      url: sessionUrl ?? undefined,
    };
  }

  @Post('cancel')
  async cancel(@Req() req: CustomRequest): Promise<{ message: string }> {
    const userId = req.user.sub;
    await this.subscriptionService.cancel(userId);
    return { message: 'Subscription cancelled' };
  }
}
