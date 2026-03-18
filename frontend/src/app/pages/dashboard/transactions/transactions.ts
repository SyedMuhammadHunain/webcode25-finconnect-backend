import { TableModule } from 'primeng/table'; import { ButtonModule } from 'primeng/button';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FintechService } from '../../../core/services/fintech.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  loading = false;
  error: string | null = null;
  page = 1;
  pageSize = 10;

  constructor(private fintechService: FintechService) { }

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
        this.transactions = Array.isArray(res) ? res : (res.data || res.transactions || []);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load transactions.';
      }
    });
  }
}