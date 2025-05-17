import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { showSnackbar } from '../../../app.component';
import { LogoutService } from '../../logout/logout.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  displayedColumns = ['name', 'email', 'phone'];
  dataSource = new MatTableDataSource<any>([]);
  searchValue = '';
  expandedUserId: string | null = null;
  transactionsMap: { [userId: string]: any[] } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private http: HttpClient,
    private logoutService: LogoutService,
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.http.get<any[]>('http://localhost:8080/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (users) => {
        const nonAdminUsers = users.filter(user => user.role !== 'admin');
        this.dataSource.data = nonAdminUsers;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error(err)
    });
  }

  get selectedUser() {
    return this.dataSource.data.find(u => u._id === this.expandedUserId);
  }  

  applyFilter() {
    const value = this.searchValue.trim().toLowerCase();
    this.dataSource.filter = value;
    this.dataSource.filterPredicate = (user, filter) =>
      user.firstName.toLowerCase().includes(filter) ||
      user.lastName.toLowerCase().includes(filter) ||
      user.email.toLowerCase().includes(filter);
  }

  toggleExpand(user: any) {
    if (this.expandedUserId === user._id) {
      this.expandedUserId = null;
    } else {
      this.expandedUserId = user._id;

      const token = localStorage.getItem('token');
      this.http.get<any[]>(`http://localhost:8080/api/admin/transactions/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (tx) => this.transactionsMap[user._id] = tx,
        error: () => showSnackbar("Failed to load transactions", "error")
      });
    }
  }

  toggleField(user: any, field: 'suspended' | 'restricted' | 'restrictedTransfers') {
    const token = localStorage.getItem('token');

    let endpoint = '';
    switch (field) {
      case 'suspended':
        endpoint = `/admin/suspense/${user._id}`;
        break;
      case 'restricted':
        endpoint = `/admin/restrict/${user._id}`;
        break;
      case 'restrictedTransfers':
        endpoint = `/admin/restrict-transfers/${user._id}`;
        break;
    }

    this.http.patch(`http://localhost:8080/api${endpoint}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        user[field] = !user[field];
      },
      error: () => showSnackbar(`Failed to update ${field}`, "error")
    });
  }

  onLogoutClick() {
    this.logoutService.confirmLogout();
  }
}
