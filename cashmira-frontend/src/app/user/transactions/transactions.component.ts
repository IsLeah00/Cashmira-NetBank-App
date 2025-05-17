import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { showSnackbar } from '../../app.component';
import { LogoutService } from '../logout/logout.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  groupedTransactions: { [key: string]: any[] } = {};
  searchDate = '';

  constructor(private http: HttpClient, private logoutService: LogoutService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.http.get<any[]>('http://localhost:8080/api/user/transaction/all', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.transactions = data;
        this.groupByDate();
      },
      error: () => showSnackbar('Failed to load transactions', 'error')
    });
  }

  abs(value: number): number {
    return Math.abs(value);
  }

  groupByDate() {
    this.groupedTransactions = {};
    this.transactions.forEach(tx => {
      const date = new Date(tx.createdAt);
      const dateKey = `${date.getFullYear()}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
      if (!this.groupedTransactions[dateKey]) {
        this.groupedTransactions[dateKey] = [];
      }
      this.groupedTransactions[dateKey].push(tx);
    });
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    const hh = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
  }  

  filteredDates(): string[] {
    return Object.keys(this.groupedTransactions).filter(date => 
      date.includes(this.searchDate)
    );
  }

  onLogoutClick() {
    this.logoutService.confirmLogout();
  }
}
