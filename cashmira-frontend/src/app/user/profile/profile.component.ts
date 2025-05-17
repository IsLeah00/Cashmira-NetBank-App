import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { showSnackbar } from '../../app.component';
import { LogoutService } from '../logout/logout.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './dialog/delete-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  pin = '';
  currentPin = '';
  newPassword = '';
  oldPassword = '';
  hidePin: boolean = true;
  hideCurrentPin: boolean = true;
  hideOldPass: boolean = true;
  hideNewPass: boolean = true;

  checks = {
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  };

  constructor(
    private http: HttpClient,
    private logoutService: LogoutService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeProfile();
  }

  initializeProfile(): void {
    const token = localStorage.getItem('token');
    this.http.get<any>('http://localhost:8080/api/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (user) => {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.phone = user.phone;
        this.currentPin = user.pin;
      },
      error: () => showSnackbar('Failed to load user data', 'error')
    });
  }

  savePersonalSettings() {
    const token = localStorage.getItem('token');
    this.http.patch('http://localhost:8080/api/user/name', {
      firstName: this.firstName,
      lastName: this.lastName
    }, { headers: { Authorization: `Bearer ${token}` }}).subscribe();

    this.http.patch('http://localhost:8080/api/user/email', {
      email: this.email
    }, { headers: { Authorization: `Bearer ${token}` }}).subscribe();

    this.http.patch('http://localhost:8080/api/user/phone', {
      phone: this.phone
    }, { headers: { Authorization: `Bearer ${token}` }}).subscribe();

    showSnackbar('Profile updated successfully!', 'success');
  }

  updatePassword() {
    const newPassword = this.newPassword.trim();
    const oldPassword = this.oldPassword.trim();
  
    if (!newPassword || !oldPassword) {
      return showSnackbar('Both passwords are required.', 'error');
    }
  
    const token = localStorage.getItem('token');
    this.http.patch('http://localhost:8080/api/user/password', {
      oldPassword,
      newPassword
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.newPassword = '';
        this.oldPassword = '';
        this.initializeProfile();
        showSnackbar('Password updated!', 'success');
      },
      error: (err) => {
        showSnackbar(err?.error?.error || 'Current password must be provided!', 'error');
      }
    });
  }

  updatePin() {
    const pin = this.pin.trim();
    if (!/^\d{4}$/.test(pin)) {
      return showSnackbar('PIN must be a 4-digit number.', 'error');
    }
  
    const token = localStorage.getItem('token');
    this.http.patch('http://localhost:8080/api/user/pin', {
      newPin: pin
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.pin = '';
        this.initializeProfile();
        showSnackbar('PIN updated successfully!', 'success');
      },
      error: () => showSnackbar('Failed to update PIN.', 'error')
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteDialogComponent, {
      width: '500px'
    });
  }

  updatePasswordChecks() {
    const pw = this.newPassword;

    this.checks.minLength = pw.length >= 5;
    this.checks.uppercase = /[A-Z]/.test(pw);
    this.checks.lowercase = /[a-z]/.test(pw);
    this.checks.number = /[0-9]/.test(pw);
    this.checks.specialChar = /[\W_]/.test(pw);
  }

  onLogoutClick() {
    this.logoutService.confirmLogout();
  }
}
