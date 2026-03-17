import { InputTextModule } from 'primeng/inputtext'; import { InputNumberModule } from 'primeng/inputnumber'; import { ButtonModule } from 'primeng/button'; import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FintechService } from '../../../core/services/fintech.service';
import { TransferFundsData } from '../../../core/models/fintech.model';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, InputNumberModule, ButtonModule],
  templateUrl: './transfer.html',
  styleUrl: './transfer.css'
})
export class TransferComponent {
  transferForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private fintechService: FintechService, private messageService: MessageService) {
    this.transferForm = this.fb.group({
      sourceAccountId: ['', Validators.required],
      destinationAccountId: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  onSubmit() {
    if (this.transferForm.invalid) return;

    this.isSubmitting = true;

    const transferData: TransferFundsData = this.transferForm.value;

    this.fintechService.transferFunds(transferData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transfer successful!' });
        this.transferForm.reset();
      },
      error: (err) => {
        this.isSubmitting = false;
      }
    });
  }
}