// src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { Auth, AuthSchema } from 'src/schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { EmailModule } from 'src/email/email.module';
import { JwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    forwardRef(() => UserModule),
    EmailModule,
    JwtConfig,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [MongooseModule],
})
export class AuthModule {}
