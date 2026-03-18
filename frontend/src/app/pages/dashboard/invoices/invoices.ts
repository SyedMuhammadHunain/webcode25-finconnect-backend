import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FintechService } from '../../../core/services/fintech.service';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './invoices.html',
  styleUrl: './invoices.css',
})
export class InvoicesComponent implements OnInit {
  invoices: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private fintechService: FintechService) { }

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
        this.invoices = Array.isArray(res) ? res : (res.transactions || res.data || res.invoices || []);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load invoices.';
      }
    });
  }
}