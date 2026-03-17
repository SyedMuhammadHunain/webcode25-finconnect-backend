import { Component, OnInit } from '@angular/core';
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
export class PaymentSuccess implements OnInit {
    constructor(private router: Router) { }

    ngOnInit(): void {
        setTimeout(() => {
            this.router.navigate(['/dashboard']);
        }, 3000);
    }

    goToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }

    goToSubscription(): void {
        this.router.navigate(['/subscription']);
    }
}
