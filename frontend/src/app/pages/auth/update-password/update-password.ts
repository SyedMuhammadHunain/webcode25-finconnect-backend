import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../../core/models/auth.model';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FloatLabel } from 'primeng/floatlabel';
import { Loading } from '../../../shared/components/loading/loading';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabel,
    Loading
  ],
  templateUrl: './update-password.html',
  styleUrl: './update-password.css',
})
export class UpdatePassword implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private destroy$ = new Subject<void>();

  updatePasswordForm!: FormGroup;

  // Signals for robust state management
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    // Initialize standard reactive form ensuring newPassword meets basic requirements
    this.updatePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.updatePasswordForm.invalid) {
      this.updatePasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    // Communicate with auth service using proper unsubscription via RxJS takeUntil
    // NOTE: The auth.interceptor.ts automatically attaches the Authorization: Bearer Header behind the scenes!
    this.authService.updatePassword(this.updatePasswordForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: AuthResponse) => {
          this.isLoading.set(false);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message || 'Password updated successfully!' });
          this.updatePasswordForm.reset();

          // Optionally redirect after a slight delay, or require them to re-login based on your security policies
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (err: Error) => {
          this.isLoading.set(false);
        }
      });
  }

  ngOnDestroy(): void {
    // Notify all subscriptions to unsubscribe to prevent memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }
}
