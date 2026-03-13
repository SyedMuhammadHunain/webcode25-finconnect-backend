import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../shared/error-handling.shared';
import { RegisterData, LoginData, ForgotPasswordData, ResendOtpData, UpdatePasswordData, AuthResponse } from '../../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;

    constructor(private http: HttpClient) { }

    register(data: RegisterData): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data)
            .pipe(catchError(handleError));
    }

    login(data: LoginData): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data)
            .pipe(catchError(handleError));
    }

    forgotPassword(data: ForgotPasswordData): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/forgot-password`, data)
            .pipe(catchError(handleError));
    }

    resendOtp(data: ResendOtpData): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/resend-otp`, data)
            .pipe(catchError(handleError));
    }

    updatePassword(data: UpdatePasswordData): Observable<AuthResponse> {
        return this.http.patch<AuthResponse>(`${this.apiUrl}/update-password`, data)
            .pipe(catchError(handleError));
    }
}
