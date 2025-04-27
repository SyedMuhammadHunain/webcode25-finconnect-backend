// src/auth/auth.controller.ts
import { Controller, Post, Body, Req, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dtos/signup.dto';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';
import { LoginDto } from 'src/dtos/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ForgotPasswordDto } from 'src/dtos/forgot-password.dto';
import { ResendOtpDto } from 'src/dtos/resend-otp.dto';
import { CustomRequest } from 'src/common/interfaces/custom-request.interface';
import { ResetPasswordDto } from 'src/dtos/update-password.dto';
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() signUpDto: SignUpDto): Promise<{ message: string }> {
    const user = await this.userService.createUser(signUpDto);
    await this.emailService.sendEmail(signUpDto.email);
    return {
      message: 'User Registered Successfully successfully',
    };
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('/forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<{
    passwordResetToken: string;
    passwordResetTokenExpiresAt: Date;
  }> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('/resend-otp')
  async resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    return this.emailService.resendOtp(resendOtpDto);
  }

  @Patch('update-password')
  async updatePassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Req() req: CustomRequest
  ) {
    const userId = req.user.sub;
    return this.authService.passwordUpdate(resetPasswordDto, userId);
  }
}
