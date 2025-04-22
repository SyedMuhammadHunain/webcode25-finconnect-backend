// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignUpDto } from 'src/dtos/signup.dto';
import { Role } from 'src/common/enums/roles.enum';
import { UnauthorizedException } from '@nestjs/common';
import { SubscriptionType } from 'src/common/enums/subscriptionType.enum';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from 'src/schemas/auth.schema';
import { Model } from 'mongoose';
import { EmailService } from 'src/email/email.service';
import { LoginDto } from 'src/dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const foundUser = await this.userModel.findOne({ email }).exec();

    if (!foundUser) {
      throw new UnauthorizedException(
        'Authentication failed: Invalid email or password',
      );
    }
    // First, check if the entered password is correct
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      throw new UnauthorizedException(
        'Authentication failed: Invalid email or password',
      );
    }

    // Secondly, check if the OTP code is correct
    const isValidOtp = await this.emailService.isValidOtp(loginDto);
    if (!isValidOtp) {
      throw new UnauthorizedException(
        'Authentication failed: Invalid verification code',
      );
    }

    // if Everything is correct, then update the user's isVerified to true
    const updatedUser = await this.userModel.findByIdAndUpdate(
      foundUser._id,
      { isVerified: true },
      { new: true },
    );

    if (!updatedUser) {
      throw new UnauthorizedException(
        'User not found after verification update',
      );
    }

    const accessToken = await this.generateToken(updatedUser);
    return { accessToken };
  }

  async generateToken(user: UserDocument): Promise<string> {
    const payload = {
      sub: (user._id as string).toString(),
      role: user.role,
      isVerified: user.isVerified,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  // async register(signUpDto: SignUpDto): Promise<any> {
  //   const { email, password } = signUpDto;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = await this.userService.createUser(email, password);
  //   return { message: 'User created successfully', user };
  // }

  // async login(username: string, password: string): Promise<any> {
  //   const user = await this.userService.findByUsername(username);
  //   if (!user || !(await bcrypt.compare(password, user.password))) {
  //     throw new Error('Invalid credentials');
  //   }

  //   const payload = { userId: user._id, role: user.role };
  //   const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

  //   return { message: 'Login successful', token };
  // }
}
