import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FintechService } from '../../../core/services/fintech.service';
import { TransferFundsData } from '../../../core/models/fintech.model';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Transfer Funds</h2>
    <div *ngIf="successMessage" class="success-message">{{ successMessage }}</div>
    <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>

    <form [formGroup]="transferForm" (ngSubmit)="onSubmit()" class="transfer-form">
      <div class="form-group">
        <label for="sourceAccountId">Source Account ID</label>
        <input id="sourceAccountId" type="text" formControlName="sourceAccountId" class="form-control" />
        <div *ngIf="transferForm.get('sourceAccountId')?.invalid && transferForm.get('sourceAccountId')?.touched" class="error-text">
          Source Account ID is required.
        </div>
      </div>

      <div class="form-group">
        <label for="destinationAccountId">Destination Account ID</label>
        <input id="destinationAccountId" type="text" formControlName="destinationAccountId" class="form-control" />
        <div *ngIf="transferForm.get('destinationAccountId')?.invalid && transferForm.get('destinationAccountId')?.touched" class="error-text">
          Destination Account ID is required.
        </div>
      </div>

      <div class="form-group">
        <label for="amount">Amount</label>
        <input id="amount" type="number" formControlName="amount" class="form-control" min="0.01" step="0.01" />
        <div *ngIf="transferForm.get('amount')?.invalid && transferForm.get('amount')?.touched" class="error-text">
          Valid amount is required.
        </div>
      </div>

      <button type="submit" [disabled]="transferForm.invalid || isSubmitting" class="submit-btn">
        {{ isSubmitting ? 'Transferring...' : 'Transfer' }}
      </button>
    </form>
  `,
  styles: [`
    .transfer-form { max-width: 400px; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
    .form-control { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .error-text { color: red; font-size: 0.85em; margin-top: 5px; }
    .submit-btn { width: 100%; padding: 10px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1em; }
    .submit-btn:disabled { background: #95a5a6; cursor: not-allowed; }
    .success-message { color: green; padding: 10px; background: #e8f8f5; border: 1px solid #2ecc71; border-radius: 4px; margin-bottom: 15px; }
    .error-message { color: red; padding: 10px; background: #fdedec; border: 1px solid #e74c3c; border-radius: 4px; margin-bottom: 15px; }
  `]
})
export class TransferComponent {
  transferForm: FormGroup;
  isSubmitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private fintechService: FintechService) {
    this.transferForm = this.fb.group({
      sourceAccountId: ['', Validators.required],
      destinationAccountId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  onSubmit() {
    if (this.transferForm.invalid) return;

    this.isSubmitting = true;
    this.successMessage = null;
    this.errorMessage = null;

    const transferData: TransferFundsData = this.transferForm.value;

    this.fintechService.transferFunds(transferData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.successMessage = 'Transfer successful!';
        this.transferForm.reset();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Transfer failed. Please try again.';
      }
    });
  }
}