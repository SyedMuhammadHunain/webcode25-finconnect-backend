import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import * as compression from 'compression';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security Measures
  app.use(helmet()); // Secure HTTP headers
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  }); // Protect against cross-origin abuse
  app.use(mongoSanitize()); // Prevent NoSQL injection attacks by sanitizing payload characters

  // Enforce reasonable payload size limits
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());

  // Test Accounts
  const userModel = app.get<Model<User>>('UserModel');

  const seedUsers = [
    {
      username: 'TestUser_1',
      email: 'test.user.account1@example.com',
      rawPassword: 'TestUser-1', // Store raw password temporarily
      balance: 1000,
    },
    {
      username: 'TestUser_2',
      email: 'test.user.account2@example.com',
      rawPassword: 'TestUser-2',
      balance: 500,
    },
  ];

  for (const user of seedUsers) {
    const existingUser = await userModel.findOne({ email: user.email }).lean();
    if (!existingUser) {
      // Only hash password if user doesn't exist
      const hashedPassword = await bcrypt.hash(user.rawPassword, 10);
      await userModel.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        balance: user.balance,
      });
    }
  }

  console.log('Seed data inserted successfully');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
