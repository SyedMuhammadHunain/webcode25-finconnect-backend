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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-resend-otp',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    ButtonModule,
    FloatLabel,
    Loading
  ],
  templateUrl: './resend-otp.html',
  styleUrl: './resend-otp.css',
})
export class ResendOtp implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private destroy$ = new Subject<void>();

  resendOtpForm!: FormGroup;

  // Signals for robust state management
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    // Initialize standard reactive form with appropriate validations
    this.resendOtpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.resendOtpForm.invalid) {
      this.resendOtpForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    // Communicate with auth service using proper unsubscription via RxJS takeUntil
    this.authService.resendOtp(this.resendOtpForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: AuthResponse) => {
          this.isLoading.set(false);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message || 'OTP resent successfully to your email.' });
          this.resendOtpForm.reset();
        },
        error: (err: Error) => {
          this.isLoading.set(false);
          // Global interceptor handles the toast, no need for inline error logic here!
        }
      });
  }

  ngOnDestroy(): void {
    // Notify all subscriptions to unsubscribe
    this.destroy$.next();
    this.destroy$.complete();
  }
}
