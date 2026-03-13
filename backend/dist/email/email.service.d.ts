import { MailerService } from '@nestjs-modules/mailer';
import { Auth } from 'src/schemas/auth.schema';
import { Model } from 'mongoose';
import { LoginDto } from 'src/dtos/login.dto';
import { ResendOtpDto } from 'src/dtos/resend-otp.dto';
export declare class EmailService {
    private authCollections;
    private readonly mailerService;
    private readonly logger;
    constructor(authCollections: Model<Auth>, mailerService: MailerService);
    private cleanupExpiredOtps;
    sendEmail(email: string, passwordResetToken?: string): Promise<string | undefined>;
    generateOtpCode(): {
        otp: string;
    };
    emailSend(otp: string, email: string, resetLink?: string): Promise<void>;
    isValidOtp(loginDto: LoginDto): Promise<boolean>;
    resendOtp(resendOtpDto: ResendOtpDto): Promise<void>;
}
