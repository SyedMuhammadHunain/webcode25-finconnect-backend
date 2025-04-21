import { Injectable, Logger } from '@nestjs/common';
import { authenticator } from 'otplib';
import { MailerService } from '@nestjs-modules/mailer';
import { Auth } from 'src/schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/dtos/login.dto';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(
    @InjectModel(Auth.name) private authCollections: Model<Auth>,
    private readonly mailerService: MailerService, // Assuming you have a MailerService
  ) {
    setInterval(() => this.cleanupExpiredOtps(), 600000);
  }
  private async cleanupExpiredOtps() {
    try {
      await this.authCollections.deleteMany({
        expiresAt: { $lt: new Date() },
      });
    } catch (error) {
      this.logger.error('Failed to cleanup expired OTPs:', error);
    }
  }
  async sendEmail(email: string) {
    const { otp } = this.generateOtpCode();

    // Create a new OTP document in the database
    await this.authCollections.create({
      email,
      code: otp,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 600000), // 10 minutes
    });

    await this.emailSend(otp, email);
  }

  // Generate a 6-digit OTP
  generateOtpCode() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return { otp };
  }

  // Send email to the user
  async emailSend(otp: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'noreply@example.com',
      subject: 'Your Verification Code',
      text: `Your verification code is: ${otp}. This code will expire in 10 minutes. Please do not share it with anyone.`,
    });
  }

  async isValidOtp(loginDto: LoginDto) {
    const { email, code } = loginDto;

    const found = await this.authCollections.findOne({ email }).exec();
    if (!found) {
      throw new UnauthorizedException('Cannot find OTP code for this email');
    }

    const { expiresAt } = found;

    // First check if otp is expired
    if (expiresAt < new Date()) {
      await this.authCollections.deleteOne({ email }).exec();
      throw new UnauthorizedException(
        'OTP code expired. Please request a new one.',
      );
    }

    // Check if the entered OTP matches the stored OTP
    if (code !== found.code) {
      throw new UnauthorizedException('Invalid OTP code');
    }

    // Delete the OTP after successful verification
    await this.authCollections.deleteOne({ email }).exec();

    return true;
  }
}
