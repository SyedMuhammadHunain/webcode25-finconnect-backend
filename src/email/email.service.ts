import { Injectable, Logger } from '@nestjs/common';
import { authenticator } from 'otplib';
import { MailerService } from '@nestjs-modules/mailer';
import { Auth } from 'src/schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/dtos/login.dto';
import cryptoRandomString from 'crypto-random-string';
import { ResendOtpDto } from 'src/dtos/resend-otp.dto';

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

  async sendEmail(email: string, passwordResetToken?: string) {
    const { otp } = this.generateOtpCode();

    // Create a new OTP document in the database
    await this.authCollections.create({
      email,
      code: otp,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 500000), // 5 minutes
    });

    let resetLink: string | undefined = undefined;
    if (passwordResetToken) {
      resetLink = `http://localhost:3000/${passwordResetToken}`;
    }

    await this.emailSend(otp, email, resetLink);
    return resetLink;
  }

  // Generate a 6-digit OTP
  generateOtpCode() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return { otp };
  }

  // Send email to the user
  async emailSend(otp: string, email: string, resetLink?: string) {
    let htmlContent = `
          <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>OTP Verification Email</title>
                  <style>
                      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                      body {
                          margin: 0;
                          padding: 0;
                          font-family: 'Inter', sans-serif;
                          background-color: #f9fafb;
                      }
                      .wrapper {
                          max-width: 640px;
                          margin: 0 auto;
                      }
                      .container {
                          padding: 40px 30px;
                          background: white;
                          border-radius: 16px;
                          margin: 20px;
                          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
                          border: 1px solid #eee;
                      }
                      .header {
                          background: linear-gradient(135deg, #fe121a, #ff4047);
                          padding: 40px 20px;
                          text-align: center;
                          border-radius: 16px 16px 0 0;
                      }
                      .logo {
                          color: white;
                          font-weight: 700;
                          font-size: 28px;
                          letter-spacing: -0.5px;
                      }
                      .content {
                          padding: 30px 20px;
                          color: #4a5568;
                          line-height: 1.6;
                      }
                      h2 {
                          color: #1a202c;
                          text-align: center;
                          margin: 0 0 30px 0;
                          font-size: 26px;
                          font-weight: 700;
                      }
                      .otp-container {
                          background: #f8fafc;
                          border-radius: 12px;
                          padding: 24px;
                          margin: 32px 0;
                          text-align: center;
                          border: 1px solid #f0f4f8;
                      }
                      .otp-code {
                          font-size: 40px;
                          font-weight: 800;
                          color: #1a202c;
                          letter-spacing: 8px;
                          margin: 15px 0;
                          font-family: 'Courier New', Courier, monospace;
                      }
                      .otp-code span {
                          display: inline-block;
                          width: 48px;
                          margin: 0 4px;
                          padding: 12px 0;
                          background: white;
                          border-radius: 8px;
                          box-shadow: 0 2px 8px rgba(254,18,26,0.1);
                          border: 1px solid #fee2e2;
                      }
                      .warning {
                          background: #fff5f5;
                          padding: 20px;
                          border-radius: 8px;
                          margin: 32px 0;
                          color: #9b2c2c;
                          border-left: 4px solid #fe121a;
                      }
                      .warning strong {
                          display: flex;
                          align-items: center;
                          gap: 8px;
                          font-size: 16px;
                          margin-bottom: 12px;
                      }
                      ul {
                          margin: 12px 0 0 20px;
                          padding: 0;
                      }
                      li {
                          margin-bottom: 8px;
                      }
                      .footer {
                          background: linear-gradient(135deg, #1a202c, #2d3748);
                          color: white;
                          padding: 32px 20px;
                          text-align: center;
                          border-radius: 0 0 16px 16px;
                          font-size: 14px;
                      }
                      .support-note {
                          color: #718096;
                          margin-top: 32px;
                          font-size: 14px;
                          text-align: center;
                      }
                      .highlight {
                          color: #fe121a;
                          font-weight: 600;
                      }
                  </style>
              </head>
              <body>
                  <div class="wrapper">
                      <div class="header">
                          <div class="logo">FinConnect</div>
                      </div>
                      <div class="container">
                          <div class="content">
                              <h2>Verify Your Email Address</h2>
                              <p>Hello there! Please use the following verification code to complete your email verification:</p>
                              
                              <div class="otp-container">
                                  <div class="otp-code">
                                  ${otp}
                                  </div>
                                  <p style="color: #718096; margin: 0;">(This code expires in 5 minutes)</p>
                                  </div>

                              <div class="warning">
                                  <strong>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                          <circle cx="12" cy="12" r="10"></circle>
                                          <line x1="12" y1="8" x2="12" y2="12"></line>
                                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                      </svg>
                                      Security Notice
                                  </strong>
                                  <ul>
                                      <li>Never share this code with anyone</li>
                                      <li>This code will expire automatically</li>
                                      <li>If not requested, just ignore</li>
                                  </ul>
                              </div>
                              ${resetLink ? `<p>Password Reset Link: <a href="${resetLink}">${resetLink}</a></p>` : ''}
                          </div>
                      </div>
                      <footer class="footer">
                          <div>
                              2025 FinConnect. All rights reserved.<br>
                              Developed and owned by <span class="highlight">MetaStackers team</span>
                          </div>
                      </footer>
                  </div>
              </body>
          </html>
    `;

    await this.mailerService.sendMail({
      to: email,
      from: 'noreply@example.com',
      subject: 'Your Verification Code',
      html: htmlContent,
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

  async resendOtp(resendOtpDto: ResendOtpDto) {
    const { otp } = this.generateOtpCode();
    const { email } = resendOtpDto;

    // Update or create OTP document
    await this.authCollections.findOneAndUpdate(
      { email },
      {
        code: otp,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 600000),
      },
      { upsert: true, new: true },
    );

    await this.emailSend(otp, email);
  }
}
