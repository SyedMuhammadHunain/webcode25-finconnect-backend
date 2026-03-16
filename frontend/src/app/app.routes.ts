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
        path: 'update-password',
        loadComponent: () => import('./pages/auth/update-password/update-password').then(m => m.UpdatePassword)
    },
    {
        path: 'subscription',
        loadComponent: () => import('./pages/subscription/subscription').then(m => m.Subscription)
    },
    {
        path: 'payment-success',
        loadComponent: () => import('./pages/payment-success/payment-success').then(m => m.PaymentSuccess)
    },
    {
        path: 'payment-cancelled',
        loadComponent: () => import('./pages/payment-cancelled/payment-cancelled').then(m => m.PaymentCancelled)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
