import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from '../../shared/error-handling.shared';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient) { }

    register(data: any): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.apiUrl}/register`, data)
            .pipe(catchError(handleError));
    }

    login(data: any): Observable<{ accessToken: string }> {
        return this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, data)
            .pipe(catchError(handleError));
    }

    forgotPassword(data: any): Observable<{ passwordResetToken: string; passwordResetTokenExpiresAt: Date }> {
        return this.http.post<{ passwordResetToken: string; passwordResetTokenExpiresAt: Date }>(`${this.apiUrl}/forgot-password`, data)
            .pipe(catchError(handleError));
    }

    resendOtp(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/resend-otp`, data)
            .pipe(catchError(handleError));
    }

    updatePassword(data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/update-password`, data)
            .pipe(catchError(handleError));
    }
}
