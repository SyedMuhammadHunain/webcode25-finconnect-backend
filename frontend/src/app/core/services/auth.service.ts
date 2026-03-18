import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../../shared/error-handling.shared';
import { RegisterData, LoginData, LoginVerifiedData, ForgotPasswordData, ResendOtpData, UpdatePasswordData, AuthResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    register(data: RegisterData): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data)
            .pipe(catchError(handleError));
    }

    login(data: LoginData): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data)
            .pipe(
                tap(response => {
                    if (response.accessToken) {
                        this.localStorageService.setItem('accessToken', response.accessToken);
                    }
                    if (response.username) {
                        this.localStorageService.setItem('userName', response.username);
                    }
                    if (response.email) {
                        this.localStorageService.setItem('userEmail', response.email);
                    }
                }),
                catchError(handleError)
            );
    }

    loginVerified(data: LoginVerifiedData): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login-verified`, data)
            .pipe(
                tap(response => {
                    if (response.accessToken) {
                        this.localStorageService.setItem('accessToken', response.accessToken);
                    }
                    if (response.username) {
                        this.localStorageService.setItem('userName', response.username);
                    }
                    if (response.email) {
                        this.localStorageService.setItem('userEmail', response.email);
                    }
                }),
                catchError(handleError)
            );
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
