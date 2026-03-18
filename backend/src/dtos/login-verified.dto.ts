import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginVerifiedDto {
    @IsEmail({}, { message: 'Invalid email format.' })
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
