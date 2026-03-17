import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FintechService } from '../../../core/services/fintech.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Transactions</h2>
    <div *ngIf="loading">Loading transactions...</div>
    <div *ngIf="error" class="error">{{ error }}</div>
    
    <table *ngIf="transactions.length > 0" class="transactions-table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let tx of transactions">
                <td>{{ tx.date | date }}</td>
                <td>{{ tx.description || tx.type || 'Transaction' }}</td>
                <td [class.negative]="tx.amount < 0">{{ tx.amount | currency }}</td>
                <td>{{ tx.status || 'Completed' }}</td>
            </tr>
        </tbody>
    </table>
    
    <div *ngIf="!loading && transactions.length === 0">
        No transactions found.
    </div>

    <div class="pagination" *ngIf="transactions.length > 0">
        <button (click)="loadPage(page - 1)" [disabled]="page === 1">Previous</button>
        <span>Page {{ page }}</span>
        <button (click)="loadPage(page + 1)">Next</button> <!-- Needs total pages logic from API -->
    </div>
  `,
  styles: [`
    .transactions-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .transactions-table th, .transactions-table td { padding: 12px; border-bottom: 1px solid #ddd; text-align: left; }
    .negative { color: #e74c3c; }
    .error { color: red; }
    .pagination { margin-top: 20px; display: flex; gap: 10px; align-items: center; }
  `]
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  loading = false;
  error: string | null = null;
  page = 1;
  pageSize = 10;

  constructor(private fintechService: FintechService) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(newPage: number) {
      if (newPage < 1) return;
      this.page = newPage;
      this.loading = true;
      this.error = null;
      
      this.fintechService.getTransactions(this.page, this.pageSize).subscribe({
          next: (res: any) => {
              this.loading = false;
              // Adjust based on actual API
              this.transactions = res.data || res.transactions || []; 
          },
          error: (err) => {
              this.loading = false;
              this.error = 'Failed to load transactions.';
          }
      });
  }
}