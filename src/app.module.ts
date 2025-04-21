// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/SandBoxPortal'),
    AuthModule,
    UserModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
