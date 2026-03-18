import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password'
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { Loading } from '../../../shared/components/loading/loading';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-login-verified',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        FloatLabel,
        ToastModule,
        Loading,
        MessageModule,
        DividerModule,
    ],
    templateUrl: './login-verified.html',
    styleUrl: './login-verified.css',
})
export class LoginVerified implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private messageService = inject(MessageService);
    private destroy$ = new Subject<void>();

    loginVerifiedForm!: FormGroup;
    isLoading = signal<boolean>(false);

    ngOnInit(): void {
        this.loginVerifiedForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    onSubmit(): void {
        if (this.loginVerifiedForm.invalid) {
            this.loginVerifiedForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);

        this.authService.loginVerified(this.loginVerifiedForm.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.isLoading.set(false);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Welcome back!',
                        detail: 'You have been signed in successfully.'
                    });
                    this.router.navigate(['/dashboard']);
                },
                error: () => {
                    this.isLoading.set(false);
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
