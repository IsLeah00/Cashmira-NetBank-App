import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { showSnackbar } from '../../app.component';
import { LogoutService } from '../logout/logout.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  balance: number = 0;
  latestTransactions: any[] = [];

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Spent', 'Received'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#5A2A27', '#8D5B4C'],
        hoverOffset: 10
      }
    ]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Your Recent Financial Activity',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      }
    }
  };

  constructor(
    private http: HttpClient,
    private logoutService: LogoutService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    this.http.get<any>('http://localhost:8080/api/user/transaction/balance', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => this.balance = res.balance,
      error: () => showSnackbar('Failed to load balance', 'error')
    });

    this.http.get<any[]>('http://localhost:8080/api/user/transaction/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (transactions) => {
        this.latestTransactions = transactions.slice(0, 5);

        const spent = this.latestTransactions
          .filter(tx => tx.amount < 0)
          .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

        const received = this.latestTransactions
          .filter(tx => tx.amount > 0)
          .reduce((sum, tx) => sum + tx.amount, 0);

        this.pieChartData = {
          labels: ['Spent', 'Received'],
          datasets: [
            {
              data: [spent, received],
              backgroundColor: ['#5A2A27', '#8D5B4C'],
              hoverOffset: 10
            }
          ]
        };
      },
      error: () => showSnackbar('Failed to load transactions', 'error')
    });
  }

  onLogoutClick() {
    this.logoutService.confirmLogout();
  }
}
