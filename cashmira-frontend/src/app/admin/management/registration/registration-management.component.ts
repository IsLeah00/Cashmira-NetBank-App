import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { showSnackbar } from '../../../app.component';
import { LogoutService } from '../../logout/logout.service';

@Component({
  selector: 'app-registration-management',
  templateUrl: './registration-management.component.html',
  styleUrls: ['./registration-management.component.css']
})
export class RegistrationManagementComponent implements OnInit {
  displayedColumns = ['name', 'email', 'phone', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private logoutService: LogoutService,
) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.http.get<any[]>('http://localhost:8080/api/admin/registrations', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (users) => {
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error(err)
    });
  }

  approveUser(id: string) {
    const token = localStorage.getItem('token');
    this.http.patch(`http://localhost:8080/api/admin/approve/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        showSnackbar("User request approved", "success");
        this.dataSource.data = this.dataSource.data.filter(u => u._id !== id);
      },
      error: () => showSnackbar("Failed to approve user", "error")
    });
  }

  denyUser(id: string) {
    const token = localStorage.getItem('token');
    this.http.delete(`http://localhost:8080/api/admin/deny/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        showSnackbar("User request denied", "error");
        this.dataSource.data = this.dataSource.data.filter(u => u._id !== id);
      },
      error: () => showSnackbar("Failed to deny user", "error")
    });
  }

  onLogoutClick() {
    this.logoutService.confirmLogout();
  }
}
