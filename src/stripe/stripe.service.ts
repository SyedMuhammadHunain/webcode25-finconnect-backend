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

  constructor(
    private configService: ConfigService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    if (!stripeSecretKey) {
      this.logger.error('STRIPE_SECRET_KEY is not defined in the environment.');
      throw new Error('STRIPE_SECRET_KEY is not defined.');
    }

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-03-31.basil', // Use a valid API version
    });
  }

  async createCheckoutSession(
    userId: string,
    priceId: string, // Use priceId instead of amount, currency, etc.
  ): Promise<string | null> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId, // Use the price ID
            quantity: 1,
          },
        ],
        mode: 'subscription', // Set mode to 'subscription'
        success_url: `http://localhost:4242/success.html`, // Replace with your actual success URL
        cancel_url: `http://localhost:4242/cancel.html`, // Replace with your actual cancel URL
        client_reference_id: userId, // Store userId for later use
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
      const user = await this.userModel.findById(userId);
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
