import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule, // Import ConfigModule
    JwtConfig,
  ],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
