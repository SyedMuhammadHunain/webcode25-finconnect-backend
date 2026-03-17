import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    templateUrl: './dashboard-layout.html',
    styleUrl: './dashboard-layout.css',
    imports: [RouterModule, CommonModule]
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
    currentTime: string = '';
    private timeInterval: any;

    ngOnInit(): void {
        this.updateTime();
        this.timeInterval = setInterval(() => this.updateTime(), 1000);
    }

    ngOnDestroy(): void {
        if (this.timeInterval) clearInterval(this.timeInterval);
    }

    private updateTime(): void {
        const now = new Date();
        this.currentTime = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
}
