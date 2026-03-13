import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dtos/signup.dto';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';
import { LoginDto } from 'src/dtos/login.dto';
import { ForgotPasswordDto } from 'src/dtos/forgot-password.dto';
import { ResendOtpDto } from 'src/dtos/resend-otp.dto';
import { CustomRequest } from 'src/common/interfaces/custom-request.interface';
import { ResetPasswordDto } from 'src/dtos/update-password.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly emailService;
    constructor(authService: AuthService, userService: UserService, emailService: EmailService);
    register(signUpDto: SignUpDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        passwordResetToken: string;
        passwordResetTokenExpiresAt: Date;
    }>;
    resendOtp(resendOtpDto: ResendOtpDto): Promise<void>;
    updatePassword(resetPasswordDto: ResetPasswordDto, req: CustomRequest): Promise<{
        message: string;
    }>;
}
