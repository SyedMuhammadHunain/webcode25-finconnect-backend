export interface RegisterData {
    username: string;
    email: string;
    password: string;
    image?: string;
}

export interface LoginData {
    email: string;
    password: string;
    code: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResendOtpData {
    email: string;
}

export interface UpdatePasswordData {
    newPassword: string;
}

export interface AuthResponse {
    message?: string;
    accessToken?: string;
    passwordResetToken?: string;
    passwordResetTokenExpiresAt?: Date;
    passwordResetLink?: string;
}
