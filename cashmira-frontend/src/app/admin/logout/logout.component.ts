import { Component } from '@angular/core';
import { LogoutService } from './logout.service';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent {
  constructor(private logoutService: LogoutService) {
    this.logoutService.confirmLogout();
  }
}
