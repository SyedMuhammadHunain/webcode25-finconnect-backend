import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  template: `
    <div class="dashboard-layout">
        <aside class="sidebar">
            <nav>
                <ul>
                    <li><a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Overview</a></li>
                    <li><a routerLink="/dashboard/transactions" routerLinkActive="active">Transactions</a></li>
                    <li><a routerLink="/dashboard/invoices" routerLinkActive="active">Invoices</a></li>
                    <li><a routerLink="/dashboard/transfer" routerLinkActive="active">Transfer</a></li>
                    <li><a routerLink="/subscription" routerLinkActive="active">Subscription</a></li>
                </ul>
            </nav>
        </aside>
        <main class="content">
            <router-outlet></router-outlet>
        </main>
    </div>
  `,
  styles: [`
    .dashboard-layout {
        display: flex;
        min-height: 100vh;
    }
    .sidebar {
        width: 250px;
        background-color: #f4f6f9;
        padding: 20px;
        border-right: 1px solid #ddd;
    }
    .sidebar ul {
        list-style: none;
        padding: 0;
    }
    .sidebar li {
        margin-bottom: 10px;
    }
    .sidebar a {
        text-decoration: none;
        color: #333;
        display: block;
        padding: 10px;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    .sidebar a:hover, .sidebar a.active {
        background-color: #e2e8f0;
        font-weight: bold;
    }
    .content {
        flex: 1;
        padding: 20px;
    }
  `],
  imports: [RouterModule]
})
export class DashboardLayoutComponent {}
