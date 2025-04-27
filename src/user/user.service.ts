import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto } from 'src/dtos/signup.dto';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/roles.enum';
import { SubscriptionType } from 'src/common/enums/subscriptionType.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(signUpDto: SignUpDto): Promise<User> {
    const { username, email, password, image } = signUpDto;

    try {
      // Check if the user already exists
      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        throw new ConflictException(
          'User with this email already exists',
        ); 
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const user = new this.userModel({
        username,
        email,
        password: hashedPassword,
        role: Role.DEVELOPER,
        isVerified: false,
        image:
          image ||
          'https://res.cloudinary.com/dtepgit65/image/upload/v1744490854/Ridee/Default/profileimage.png',
        isSubscribed: false,
        subscriptionType: SubscriptionType.BASIC,
        subscriptionExpiry: null,
      });
      

      // Save the user to the database
      return await user.save();
    } catch (error) {
      // Handle any errors during the user creation process
      console.error('Error during user creation:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
