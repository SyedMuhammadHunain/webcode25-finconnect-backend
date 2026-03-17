import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FintechService } from '../../../core/services/fintech.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class OverviewComponent implements OnInit {
  balance: number | null = null;
  error: string | null = null;

  constructor(private fintechService: FintechService) { }

  ngOnInit(): void {
    this.fintechService.getBalance().subscribe({
      next: (res: any) => {
        this.balance = res.balance ?? res.amount ?? 0;
      },
      error: (err) => {
        this.error = 'Failed to load balance. Please try again.';
        console.error(err);
      }
    });
  }
}
