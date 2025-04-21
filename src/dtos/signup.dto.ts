import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsOptional,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z ]+$/, {
    message: 'Name can only contain letters and spaces.',
  })
  username: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty()
  email: string;

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
  password: string;

  @IsOptional()
  @IsString()
  image?: string;
}
