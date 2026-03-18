import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

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
        path: 'login-verified',
        loadComponent: () => import('./pages/auth/login-verified/login-verified').then(m => m.LoginVerified)
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
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard-layout').then(m => m.DashboardLayoutComponent),
        canActivate: [authGuard],
        children: [
            { path: '', loadComponent: () => import('./pages/dashboard/overview/overview').then(m => m.OverviewComponent) },
            { path: 'transactions', loadComponent: () => import('./pages/dashboard/transactions/transactions').then(m => m.TransactionsComponent) },
            { path: 'invoices', loadComponent: () => import('./pages/dashboard/invoices/invoices').then(m => m.InvoicesComponent) },
            { path: 'transfer', loadComponent: () => import('./pages/dashboard/transfer/transfer').then(m => m.TransferComponent) },
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
