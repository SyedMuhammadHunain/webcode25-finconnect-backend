import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FloatLabel } from 'primeng/floatlabel';
import { Loading } from '../../../shared/components/loading/loading';
import { ErrorComponent } from '../../../shared/components/messages/error/error';

@Component({
  selector: 'app-login',
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
    Loading,
    ErrorComponent
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  loginForm!: FormGroup;

  // Signals for robust state management
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    // Initialize standard reactive form with appropriate validations
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      code: ['', [Validators.required]] // The backend requires code based on @IsNotEmpty()
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Communicate with auth service using proper unsubscription via RxJS takeUntil
    this.authService.login(this.loginForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/subscription']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.message || 'Login failed. Please check your credentials.');
        }
      });
  }

  ngOnDestroy(): void {
    // Notify all subscriptions to unsubscribe
    this.destroy$.next();
    this.destroy$.complete();
  }
}
