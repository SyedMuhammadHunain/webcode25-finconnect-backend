import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/jwt-auth.guard';
import { SubscriptionModule } from './subscription/subscription.module';
import { JwtConfig } from './config/jwt.config';
import { StripeModule } from './stripe/stripe.module';
import { SubscriptionGuard } from './common/guards/subscription.guard';
import { FintechModule } from './fintech/fintech.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 60000,
        limit: 100,
      },
    ]),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
        // Optimized Connection Pooling Settings:
        maxPoolSize: 20, // Cap at 20 active connections to prevent DB exhaustion
        minPoolSize: 2, // Start with 2 and scale up when necessary to save resources
        maxIdleTimeMS: 30000, // Drop connections that are idle for more than 30 seconds
        serverSelectionTimeoutMS: 5000, // Timeout after 5s if DB is unresponsive
        socketTimeoutMS: 45000, // Close sockets after 45s of network inactivity
        waitQueueTimeoutMS: 10000, // Fail fast if requests wait >10s in queue for an available connection
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    EmailModule,
    JwtConfig,
    SubscriptionModule,
    StripeModule,
    FintechModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: SubscriptionGuard,
    },
  ],
})
export class AppModule { }
