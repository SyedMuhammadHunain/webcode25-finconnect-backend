import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-payment-success',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule],
    templateUrl: './payment-success.html',
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
