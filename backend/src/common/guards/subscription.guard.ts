import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { StripeService } from 'src/stripe/stripe.service'; // Import StripeService
import { SUBSCRIPTION_KEY } from 'src/common/constants/subscription.constants'; // Import your subscription key constant
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { Observable } from 'rxjs';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private stripeService: StripeService, // Inject StripeService
    private jwtService: JwtService, // Inject JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredSubscription = this.reflector.getAllAndOverride<boolean>(
      SUBSCRIPTION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (requiredSubscription === undefined) {
      return true; // No subscription check required
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync(token);
      const userId = payload.userId;

      const isSubscribed = await this.stripeService.isSubscribed(userId); // Use StripeService

      if (!isSubscribed && requiredSubscription) {
        throw new HttpException('Subscription required', HttpStatus.FORBIDDEN);
      }
      

      request.user = payload; // Optionally attach user payload to the request
      return true;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
