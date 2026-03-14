import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'signup',
        loadComponent: () => import('./pages/auth/signup/signup').then(m => m.Signup)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login').then(m => m.Login)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./pages/auth/forgot-password/forgot-password').then(m => m.ForgotPassword)
    },
    {
        path: 'resend-otp',
        loadComponent: () => import('./pages/auth/resend-otp/resend-otp').then(m => m.ResendOtp)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
