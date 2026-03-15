import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-loading',
  imports: [CommonModule, ButtonModule],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {
    @Input() loading: boolean = false;
    @Input() label: string = 'Submit';
    @Input() icon: string = '';
    @Input() disabled: boolean = false;
}
