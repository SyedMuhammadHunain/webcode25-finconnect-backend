import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('accessToken');
    console.log('AuthGuard: Checking authentication, token:', token);
    if (token) {
        return true;
    }

    return router.parseUrl('/login');
};
