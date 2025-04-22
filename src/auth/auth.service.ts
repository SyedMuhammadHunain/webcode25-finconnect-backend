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
import { ForgotPasswordDto } from 'src/dtos/forgot-password.dto';
import { NotFoundException } from '@nestjs/common';
import cryptoRandomString from 'crypto-random-string';
import { ResetPasswordDto } from 'src/dtos/update-password.dto';
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
    // Bypass OTP validation for test accounts
    const testAccounts = [
      'test.user.account1@example.com',
      'test.user.account2@example.com',
    ];
    if (!testAccounts.includes(email)) {
      // Secondly, check if the OTP code is correct for non-test accounts
      const isValidOtp = await this.emailService.isValidOtp(loginDto);
      if (!isValidOtp) {
        throw new UnauthorizedException(
          'Authentication failed: Invalid verification code',
        );
      }
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

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
    passwordResetToken: string;
    passwordResetTokenExpiresAt: Date;
  }> {
    const { email } = forgotPasswordDto;

    // Find the user with the email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(
        'Account not found: No user registered with this email',
      );
    }

    // Generate a password reset token
    const passwordResetToken = await this.generatePasswordResetToken();
    const calculateExpiry = new Date(Date.now() + 500000); // 5 minutes

    // Save the password reset token to the database temporarily
    await this.userModel.updateOne(
      { email },
      {
        $set: {
          passwordResetToken,
          passwordResetTokenExpiresAt: calculateExpiry,
        },
      },
    );

    // Send the password reset token to the user's email
    await this.emailService.sendEmail(email);

    return { passwordResetToken, passwordResetTokenExpiresAt: calculateExpiry };
  }

  async generatePasswordResetToken(): Promise<string> {
    const resetToken = cryptoRandomString({ length: 30, type: 'alphanumeric' });
    return resetToken;
  }

  async passwordUpdate(
    resetPasswordDto: ResetPasswordDto,
    userId: string,
  ): Promise<{ message: string }> {
    const { newPassword } = resetPasswordDto;

    // Find the user with the provided token
    const user = await this.userModel.findOne({
      _id: userId,
    });

    if (!user) {
      throw new NotFoundException('Unable to find user');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    await this.userModel.updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetTokenExpiresAt: null,
        },
      },
    );

    return { message: 'Password updated successfully' };
  }
}
