import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FintechService } from '../../../core/services/fintech.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: `
    <div class="overview-container">
        <p-card header="Current Balance">
            <div *ngIf="balance !== null" class="balance-display">
                <span class="balance-amount">{{ balance | currency }}</span>
            </div>
            <div *ngIf="balance === null">
                <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            </div>
        </p-card>
    </div>
  `,
  styles: [`
    .overview-container { padding: 1rem; }
    .balance-display { text-align: center; padding: 2rem; }
    .balance-amount { font-size: 3rem; font-weight: bold; color: var(--primary-color, #10b981); }
  `]
})
export class OverviewComponent implements OnInit {
  balance: number | null = null;

  constructor(private fintechService: FintechService) {}

  ngOnInit(): void {
    this.fintechService.getBalance().subscribe({
      next: (res: any) => {
        this.balance = res.balance || res.amount || 0;
      },
      error: () => {
        this.balance = 0;
      }
    });
  }
}
