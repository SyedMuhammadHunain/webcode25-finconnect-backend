import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20, { message: 'Password must be between 10 and 20 characters.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Password must contain at least one uppercase, one lowercase, one number, and one special character.',
    },
  )
  newPassword: string;
}
