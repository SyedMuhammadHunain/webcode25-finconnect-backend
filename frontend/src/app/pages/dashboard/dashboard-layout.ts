import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    templateUrl: './dashboard-layout.html',
    styleUrl: './dashboard-layout.css',
    imports: [RouterModule, CommonModule]
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
    currentTime: string = '';
    sidebarOpen: boolean = false;
    userPopoverOpen: boolean = false;
    userName: string = 'User';
    userEmail: string = '';
    private timeInterval: any;

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.updateTime();
        this.timeInterval = setInterval(() => this.updateTime(), 1000);
        this.loadUserInfo();
    }

    ngOnDestroy(): void {
        if (this.timeInterval) clearInterval(this.timeInterval);
    }

    toggleSidebar(): void {
        this.sidebarOpen = !this.sidebarOpen;
    }

    closeSidebar(): void {
        this.sidebarOpen = false;
    }

    toggleUserPopover(): void {
        this.userPopoverOpen = !this.userPopoverOpen;
    }

    closeUserPopover(): void {
        this.userPopoverOpen = false;
    }

    logout(): void {
        this.localStorageService.removeItem('accessToken');
        this.localStorageService.removeItem('userName');
        this.localStorageService.removeItem('userEmail');
        this.userPopoverOpen = false;
        this.router.navigate(['/login']);
    }

    private loadUserInfo(): void {
        this.userName = this.localStorageService.getItem('userName') || 'User';
        this.userEmail = this.localStorageService.getItem('userEmail') || '';
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
