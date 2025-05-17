import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './dialog/logout-dialog.component';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LogoutService {
  constructor(private dialog: MatDialog, private router: Router) {}

  confirmLogout(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '350px',
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/auth']);
      }
    });
  }
}
