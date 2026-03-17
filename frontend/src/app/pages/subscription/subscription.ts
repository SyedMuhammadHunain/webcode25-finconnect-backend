import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../core/services/subscription.service';
import { SubscriptionType, SubscriptionData } from '../../core/models/subscription.model';
import { CardModule } from 'primeng/card';
import { Loading } from '../../shared/components/loading/loading';
import { MessageService } from 'primeng/api';

interface Plan {
  type: SubscriptionType;
  label: string;
  price: number;
  icon: string;
  features: string[];
}

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, CardModule, Loading],
  templateUrl: './subscription.html',
  styleUrl: './subscription.css',
})
export class Subscription {
  private subscriptionService = inject(SubscriptionService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  isLoading = signal<boolean>(false);

  plans: Plan[] = [
    {
      type: SubscriptionType.BASIC,
      label: 'Basic',
      price: 10,
      icon: 'pi pi-bolt',
      features: ['Basic Analytics', 'Up to 5 Projects', 'Email Support']
    },
    {
      type: SubscriptionType.STANDARD,
      label: 'Standard',
      price: 25,
      icon: 'pi pi-shield',
      features: ['Advanced Analytics', 'Up to 20 Projects', 'Priority Support', 'Custom Reports']
    },
    {
      type: SubscriptionType.PREMIUM,
      label: 'Premium',
      price: 50,
      icon: 'pi pi-star-fill',
      features: ['Full Suite Access', 'Unlimited Projects', '24/7 Phone Support', 'Dedicated Manager']
    }
  ];

  onSubscribe(plan: Plan): void {
    this.isLoading.set(true);

    const data: SubscriptionData = {
      subscriptionType: plan.type,
      amount: plan.price
    };

    this.subscriptionService.subscribe(data).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });

        if (response.url) {
          window.location.href = response.url;
        } else {
          // Fallback if no URL is returned
          setTimeout(() => this.router.navigate(['/']), 2000);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
      }
    });
  }
}
