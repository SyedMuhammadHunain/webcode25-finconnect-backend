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
            let errorMsg = 'An unknown error occurred!';
            
            if (error.error instanceof ErrorEvent) {
                // Client-side error
                errorMsg = `Error: ${error.error.message}`;
            } else {
                // Server-side error
                errorMsg = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
                
                if (error.status === 401) {
                    errorMsg = 'Unauthorized: Please log in again.';
                    // Potentially trigger logout/redirect here
                }
            }
            
            messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
            
            return throwError(() => error);
        })
    );
};
