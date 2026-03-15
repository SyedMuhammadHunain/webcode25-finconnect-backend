import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, MessageModule],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class ErrorComponent {
  @Input() text: string | null = null;
}
