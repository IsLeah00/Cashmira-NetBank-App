import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { showSnackbar } from '../../app.component';
import { LogoutService } from '../logout/logout.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  payee = '';
  toCardNumber = '';
  amount: number | null = null;
  statement = '';

  constructor(private http: HttpClient, private logoutService: LogoutService) {}

  submitTransfer() {
    if (!this.payee || !this.toCardNumber || !this.amount) {
      return showSnackbar('Please fill out all required fields.', 'error');
    }

    const token = localStorage.getItem('token');
    this.http.post('http://localhost:8080/api/user/transaction/send', {
      payee: this.payee,
      toCardNumber: this.toCardNumber,
      amount: this.amount,
      statement: this.statement
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        showSnackbar('Transfer successful!', 'success');
        this.payee = '';
        this.toCardNumber = '';
        this.amount = null;
        this.statement = '';
      },
      error: err => {
        showSnackbar(err?.error?.error || 'Transfer failed.', 'error');
      }
    });
  }

  onLogoutClick() {
    this.logoutService.confirmLogout();
  }
}
