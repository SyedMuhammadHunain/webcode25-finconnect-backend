import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-payment-cancelled',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './payment-cancelled.html',
})
export class PaymentCancelled {
  constructor(private router: Router) { }

  retrySubscription(): void {
    this.router.navigate(['/subscription']);
  }

  goHome(): void {
    this.router.navigate(['/login']);
  }
}
