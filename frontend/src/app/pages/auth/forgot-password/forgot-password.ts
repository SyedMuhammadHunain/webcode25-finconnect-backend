import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../../core/models/auth.model';
import { RouterLink } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FloatLabel } from 'primeng/floatlabel';
import { Loading } from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    FloatLabel,
    Loading
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  forgotPasswordForm!: FormGroup;

  // Signals for robust state management
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  ngOnInit(): void {
    // Initialize standard reactive form with appropriate validations
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    // Communicate with auth service using proper unsubscription via RxJS takeUntil
    this.authService.forgotPassword(this.forgotPasswordForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: AuthResponse) => {
          this.isLoading.set(false);
          this.successMessage.set(response.message || 'Password reset link sent to your email.');
          this.forgotPasswordForm.reset();
        },
        error: (err: Error) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.message || 'Failed to send password reset link. Please try again.');
        }
      });
  }

  ngOnDestroy(): void {
    // Notify all subscriptions to unsubscribe
    this.destroy$.next();
    this.destroy$.complete();
  }
}
