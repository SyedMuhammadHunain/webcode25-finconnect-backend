import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Auth } from 'src/schemas/auth.schema';
import { Model } from 'mongoose';
import { EmailService } from 'src/email/email.service';
import { LoginDto } from 'src/dtos/login.dto';
import { ForgotPasswordDto } from 'src/dtos/forgot-password.dto';
import { ResetPasswordDto } from 'src/dtos/update-password.dto';
export declare class AuthService {
    private userModel;
    private authModel;
    private readonly userService;
    private readonly jwtService;
    private readonly emailService;
    constructor(userModel: Model<User>, authModel: Model<Auth>, userService: UserService, jwtService: JwtService, emailService: EmailService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    generateToken(user: UserDocument): Promise<string>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        passwordResetToken: string;
        passwordResetTokenExpiresAt: Date;
        passwordResetLink?: string;
    }>;
    generatePasswordResetToken(): Promise<string>;
    passwordUpdate(resetPasswordDto: ResetPasswordDto, userId: string): Promise<{
        message: string;
    }>;
}
