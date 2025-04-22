// src/app.module.ts
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
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/SandBoxPortal'),
    AuthModule,
    UserModule,
    EmailModule,
    JwtConfig,
    SubscriptionModule,
    StripeModule,
  ],
  controllers: [],
  providers: [
    AppService,
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
export class AppModule {}
