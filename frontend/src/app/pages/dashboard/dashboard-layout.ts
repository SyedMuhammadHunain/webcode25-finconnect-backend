import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    templateUrl: './dashboard-layout.html',
    styleUrl: './dashboard-layout.css',
    imports: [RouterModule]
})
export class DashboardLayoutComponent { }
