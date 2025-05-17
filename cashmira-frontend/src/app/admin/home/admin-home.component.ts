import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LogoutService } from '../logout/logout.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  displayedColumns: string[] = ['icon', 'title', 'message', 'createdAt'];
  logs = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private http: HttpClient,
    private logoutService: LogoutService,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    this.http.get<any[]>('http://localhost:8080/api/admin/logs', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        this.logs.data = res;
        this.logs.paginator = this.paginator;
      },
      error: (err) => console.error(err)
    });
  }

  getIcon(type: string): string {
    if (type.includes('Bug')) return 'bug_report';
    if (type.includes('Feature')) return 'star';
    if (type.includes('Maintenance')) return 'build';
    return 'note';
  }

  onLogoutClick() {
    this.logoutService.confirmLogout();
  }
}
