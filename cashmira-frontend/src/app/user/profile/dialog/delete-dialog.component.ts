import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { showSnackbar } from '../../../app.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent {
  passwordInput = '';
  isDeleting = false;
  hidePassword: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private http: HttpClient
  ) {}

  confirmDelete() {
    const token = localStorage.getItem('token');
    this.isDeleting = true;
  
    this.http.delete('http://localhost:8080/api/user/delete', {
      headers: { Authorization: `Bearer ${token}` },
      body: { password: this.passwordInput }
    }).subscribe({
      next: () => {
        localStorage.clear();
        window.location.href = '/auth';
      },
      error: (err) => {
        showSnackbar(err?.error?.error || 'Incorrect password', 'error');
        this.isDeleting = false;
      }
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
