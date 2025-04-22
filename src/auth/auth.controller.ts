// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dtos/signup.dto';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';
import { LoginDto } from 'src/dtos/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
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
}
