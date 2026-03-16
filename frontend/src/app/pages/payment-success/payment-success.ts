import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-payment-success',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="success-wrapper">
      <div class="success-card">
        <div class="icon-ring">
          <svg viewBox="0 0 52 52" class="checkmark">
            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h1>Payment Successful!</h1>
        <p>Thank you for subscribing. Your plan is now active.</p>
        <div class="actions">
          <button class="btn-primary" (click)="goToDashboard()">Go to Dashboard</button>
          <button class="btn-secondary" (click)="goToSubscription()">View Subscription</button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .success-wrapper {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', sans-serif;
    }
    .success-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 24px;
      padding: 56px 48px;
      text-align: center;
      max-width: 480px;
      width: 90%;
      backdrop-filter: blur(12px);
      animation: slideUp 0.5s ease-out;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .icon-ring {
      width: 100px;
      height: 100px;
      margin: 0 auto 28px;
    }
    .checkmark { width: 100px; height: 100px; }
    .checkmark-circle {
      stroke: #22c55e;
      stroke-width: 2;
      stroke-dasharray: 166;
      stroke-dashoffset: 166;
      animation: stroke 0.6s cubic-bezier(0.65,0,0.45,1) forwards;
    }
    .checkmark-check {
      stroke: #22c55e;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      animation: stroke 0.3s cubic-bezier(0.65,0,0.45,1) 0.8s forwards;
    }
    @keyframes stroke {
      100% { stroke-dashoffset: 0; }
    }
    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #f1f5f9;
      margin: 0 0 12px;
    }
    p {
      color: #94a3b8;
      font-size: 1rem;
      margin: 0 0 36px;
      line-height: 1.6;
    }
    .actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn-primary {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff;
      border: none;
      border-radius: 12px;
      padding: 14px 28px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.2s;
    }
    .btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
    .btn-secondary {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 12px;
      padding: 14px 28px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-secondary:hover {
      border-color: rgba(255,255,255,0.3);
      color: #f1f5f9;
    }
  `]
})
export class PaymentSuccess {
    constructor(private router: Router) { }

    goToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }

    goToSubscription(): void {
        this.router.navigate(['/subscription']);
    }
}
