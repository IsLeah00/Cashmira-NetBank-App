import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { showSnackbar } from '../../app.component';
import { LogoutService } from '../logout/logout.service';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrls: ['./card-management.component.css']
})
export class CardManagementComponent {
  pin = '';
  card: any = null;
  cardName = '';
  hidePin = true;

  atmLimit = '';
  transferLimit = '';
  purchaseLimit = '';
  isBlocked = false;

  constructor(
    private http: HttpClient,
    private logoutService: LogoutService
  ) {}

  viewCard() {
    const token = localStorage.getItem('token');
    if (!/^\d{4}$/.test(this.pin)) {
      return showSnackbar('PIN must be a 4-digit number.', 'error');
    }

    this.http.get<any>(`http://localhost:8080/api/user/card/view?pin=${this.pin}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        this.card = res;
        this.cardName = res.cardName;
        this.isBlocked = res.blocked;
        this.atmLimit = res.atmLimitDaily;
        this.transferLimit = res.transferLimitDaily;
        this.purchaseLimit = res.purchaseLimitDaily;
      },
      error: () => showSnackbar('Invalid PIN or card not found.', 'error')
    });
  }

  renameCard() {
    const token = localStorage.getItem('token');
    this.http.patch('http://localhost:8080/api/user/card/rename', {
      newName: this.cardName
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => showSnackbar('Card renamed successfully!', 'success'),
      error: () => showSnackbar('Failed to rename card.', 'error')
    });
  }

  toggleBlockCard() {
    if (!this.card) {
      return showSnackbar('Incorrect or invalid PIN.', 'error');
    }
  
    const token = localStorage.getItem('token');
    this.http.patch(`http://localhost:8080/api/user/card/block/${this.card._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        this.isBlocked = !this.isBlocked;
        this.viewCard();
        showSnackbar(res.message, 'success');
      },
      error: () => showSnackbar('Failed to update card block status.', 'error')
    });
  }

  updateLimit(type: 'atm' | 'transfer' | 'purchase') {
    const limit = Number(
      type === 'atm' ? this.atmLimit : type === 'transfer' ? this.transferLimit : this.purchaseLimit
    );

    if (isNaN(limit) || limit < 10 || limit > 100000000000) {
      return showSnackbar("To set a limit this high / low, please contact Cashmira's Support Team.", 'error');
    }

    const token = localStorage.getItem('token');
    const url = `http://localhost:8080/api/user/card/${type}-limit`;

    this.http.patch(url, { limit }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.viewCard();
        showSnackbar(`${type.charAt(0).toUpperCase() + type.slice(1)} limit updated!`, 'success');
      },
      error: () => showSnackbar(`Failed to update ${type} limit.`, 'error')
    });
  }

  onLogoutClick() {
    this.logoutService.confirmLogout();
  }
}
