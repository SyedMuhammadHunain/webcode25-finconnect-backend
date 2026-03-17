import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const localStorageService = inject(LocalStorageService);
    const messageService = inject(MessageService);
    const token = localStorageService.getItem('accessToken') || localStorageService.getItem('token');

    let handledReq = req;

    // If a token in LocalStorage exists, clone the request to add the authentication header.
    if (token) {
        handledReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(handledReq).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMsg = 'An unexpected error occurred. Please try again.';
            
            // For developers: log the full error deeply
            console.error('[DEV LOG] Backend Request Failed:', {
                url: req.url,
                status: error.status,
                message: error.message,
                detailedError: error.error
            });
            
            if (error.error instanceof ErrorEvent) {
                // Client-side / network error
                errorMsg = 'A network error occurred. Check your connection.';
            } else {
                // Server-side error mapping
                if (error.status === 401) {
                    errorMsg = 'Your session has expired or is invalid. Please log in again.';
                } else if (error.status >= 500) {
                    errorMsg = 'Our servers are experiencing issues. Please try again later.';
                } else if (error.status === 400 || error.status === 404) {
                    errorMsg = error.error?.message || 'Invalid request. Please check your data.';
                }
            }
            
            // Extract a cleaner string if it's an array or object
            if (Array.isArray(errorMsg)) {
                errorMsg = errorMsg[0];
            }
            
            messageService.add({ 
                severity: 'error', 
                summary: 'Action Failed', 
                detail: typeof errorMsg === 'string' ? errorMsg : 'An error occurred.',
                life: 5000 
            });
            
            return throwError(() => error);
        })
    );
};
