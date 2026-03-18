import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../../core/models/auth.model';
import { RouterLink } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FloatLabel } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { Loading } from '../../../shared/components/loading/loading';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-resend-otp',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    ButtonModule,
    MessageModule,
    FloatLabel,
    ToastModule,
    Loading,
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
  isLoading = signal<boolean>(false);
  successMessage: string | null = null;

  ngOnInit(): void {
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
    this.successMessage = null;

    this.authService.resendOtp(this.resendOtpForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: AuthResponse) => {
          this.isLoading.set(false);
          this.successMessage = response.message || 'OTP sent successfully! Check your inbox.';
          this.messageService.add({
            severity: 'success',
            summary: 'OTP Sent',
            detail: this.successMessage,
            life: 5000
          });
          this.resendOtpForm.reset();
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
