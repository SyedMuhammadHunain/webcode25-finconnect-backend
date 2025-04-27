// filepath: src/subscription/subscription.controller.ts
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SubscriptionType } from 'src/common/enums/subscriptionType.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { CustomRequest } from 'src/common/interfaces/custom-request.interface';

@Controller('api/subscriptions')
@UseGuards(AuthGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  async subscribe(
    @Req() req: CustomRequest,
    @Body() body: { subscriptionType: SubscriptionType; amount: number },
  ): Promise<{ message: string }> {
    const userId = req.user.sub;
    await this.subscriptionService.subscribe(userId, body.subscriptionType, body.amount);
    return { message: `Subscribed to ${body.subscriptionType}` };
  }

  @Post('cancel')
  async cancel(@Req() req: CustomRequest): Promise<{ message: string }> {
    const userId = req.user.sub;
    await this.subscriptionService.cancel(userId);
    return { message: 'Subscription cancelled' };
  }
}
