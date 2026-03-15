import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, MessageModule],
  templateUrl: './success.html',
  styleUrl: './success.css',
})
export class SuccessComponent {
  @Input() text: string | null = null;
}
