import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Test Accounts
  const userModel = app.get<Model<User>>('UserModel');

  const seedUsers = [
    {
      username: 'TestUser_1',
      email: 'test.user.account1@example.com',
      password: await bcrypt.hash('TestUser-1', 10), // Hash the password
      balance: 1000,
    },
    {
      username: 'TestUser_2',
      email: 'test.user.account2@example.com',
      password: await bcrypt.hash('TestUser-2', 10),
      balance: 500,
    },
  ];

  for (const user of seedUsers) {
    const existingUser = await userModel.findOne({ email: user.email });
    if (!existingUser) {
      await userModel.create(user);
    }
  }

  console.log('Seed data inserted successfully');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
