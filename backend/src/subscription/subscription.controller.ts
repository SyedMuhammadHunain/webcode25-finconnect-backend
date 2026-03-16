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

    // Map subscription type to amount in cents and a display name
    const planDetails: Record<SubscriptionType, { amountCents: number; label: string }> = {
      [SubscriptionType.BASIC]: { amountCents: 1000, label: 'Basic Plan ($10/month)' },
      [SubscriptionType.STANDARD]: { amountCents: 2500, label: 'Standard Plan ($25/month)' },
      [SubscriptionType.PREMIUM]: { amountCents: 5000, label: 'Premium Plan ($50/month)' },
    };

    const { amountCents, label } = planDetails[body.subscriptionType];

    const sessionUrl = await this.stripeService.createCheckoutSession(
      userId,
      amountCents,
      label,
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
