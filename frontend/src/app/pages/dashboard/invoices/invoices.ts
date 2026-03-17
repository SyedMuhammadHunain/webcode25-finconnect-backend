import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FintechService } from '../../../core/services/fintech.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Invoices</h2>
    <div *ngIf="loading">Loading invoices...</div>
    <div *ngIf="error" class="error">{{ error }}</div>
    
    <table *ngIf="invoices.length > 0" class="invoices-table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Invoice ID</th>
                <th>Amount</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let inv of invoices">
                <td>{{ inv.date | date }}</td>
                <td>{{ inv.id || 'N/A' }}</td>
                <td>{{ inv.amount | currency }}</td>
                <td>{{ inv.status || 'Pending' }}</td>
            </tr>
        </tbody>
    </table>
    
    <div *ngIf="!loading && invoices.length === 0">
        No invoices found.
    </div>
  `,
  styles: [`
    .invoices-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .invoices-table th, .invoices-table td { padding: 12px; border-bottom: 1px solid #ddd; text-align: left; }
    .error { color: red; }
  `]
})
export class InvoicesComponent implements OnInit {
  invoices: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private fintechService: FintechService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
      this.loading = true;
      this.error = null;
      
      // Defaulting to a 30 day window for demonstration
      const end = new Date().toISOString();
      const start = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString();

      this.fintechService.getInvoice(start, end).subscribe({
          next: (res: any) => {
              this.loading = false;
              // Adjust based on actual API
              this.invoices = res.data || res.invoices || []; 
          },
          error: (err) => {
              this.loading = false;
              this.error = 'Failed to load invoices.';
          }
      });
  }
}