import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);
  private readonly successUrl: string;
  private readonly cancelUrl: string;

  constructor(
    private configService: ConfigService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    this.successUrl =
      this.configService.get<string>('STRIPE_SUCCESS_URL') ||
      'http://localhost:4200/';
    this.cancelUrl =
      this.configService.get<string>('STRIPE_CANCEL_URL') ||
      'http://localhost:4200/subscription';

    if (!stripeSecretKey) {
      this.logger.error('STRIPE_SECRET_KEY is not defined in the environment.');
      throw new Error('STRIPE_SECRET_KEY is not defined.');
    }

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2026-02-25.clover', // Use a valid API version
    });
  }

  async createCheckoutSession(
    userId: string,
    amount: number,     // amount in cents (e.g. 1000 = $10.00)
    planName: string,   // e.g. "Basic Plan"
  ): Promise<string | null> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'], // Disable Google Pay / Apple Pay — force manual card entry
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: amount, // in cents
              product_data: {
                name: planName,
              },
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: this.successUrl,
        cancel_url: this.cancelUrl,
        client_reference_id: userId,
      });

      return session.url;
    } catch (error) {
      this.logger.error('Error creating session:', error);
      throw new InternalServerErrorException(
        'Failed to create checkout session',
      );
    }
  }
  async isSubscribed(userId: string): Promise<boolean> {
    try {
      const user = await this.userModel.findById(userId).lean().exec();
      if (!user) {
        this.logger.warn(`User not found: ${userId}`);
        return false;
      }
      return user.isSubscribed;
    } catch (error) {
      this.logger.error(
        `Error checking subscription for user ${userId}:`,
        error,
      );
      return false;
    }
  }
}
