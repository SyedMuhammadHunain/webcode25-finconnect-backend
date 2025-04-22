import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CustomRequest } from 'src/common/interfaces/custom-request.interface';

@Controller('api/subscription/')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @UseGuards(AuthGuard)
  @Get('create-checkout-session')
  async createCheckoutSession(
    @Query('priceId') priceId: string,
    @Req() req: CustomRequest,
  ): Promise<{ url: string }> {
    try {
      const userId = req.user.sub;
      const sessionUrl = await this.stripeService.createCheckoutSession(
        userId,
        priceId,
      );

      if (!sessionUrl) {
        throw new HttpException(
          'Failed to create checkout session',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return { url: sessionUrl };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
