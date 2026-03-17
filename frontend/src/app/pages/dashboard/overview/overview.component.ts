import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FintechService } from '../../../core/services/fintech.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Dashboard Overview</h2>
    <div *ngIf="balance !== null">
        <h3>Current Balance</h3>
        <p class="balance">{{ balance | currency }}</p>
    </div>
    <div *ngIf="error">
        <p class="error">{{ error }}</p>
    </div>
  `,
  styles: [`
    .balance { font-size: 2em; font-weight: bold; color: #2ecc71; }
    .error { color: red; }
  `]
})
export class OverviewComponent implements OnInit {
  balance: number | null = null;
  error: string | null = null;

  constructor(private fintechService: FintechService) {}

  ngOnInit(): void {
    this.fintechService.getBalance().subscribe({
      next: (res: any) => {
        this.balance = res.balance || res.amount || 0; // Adjust based on actual API response structure
      },
      error: (err) => {
        this.error = 'Failed to load balance.';
        console.error(err);
      }
    });
  }
}