import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { StripeService } from 'src/stripe/stripe.service';
import { JwtService } from '@nestjs/jwt';
export declare class SubscriptionGuard implements CanActivate {
    private reflector;
    private stripeService;
    private jwtService;
    constructor(reflector: Reflector, stripeService: StripeService, jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
