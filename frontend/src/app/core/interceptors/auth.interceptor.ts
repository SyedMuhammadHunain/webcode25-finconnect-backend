import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const localStorageService = inject(LocalStorageService);
    const token = localStorageService.getItem('accessToken');

    // If a token in LocalStorage exists, clone the request to add the authentication header.
    if (token) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(authReq);
    }

    // Pass the original request if there's no token
    return next(req);
};
