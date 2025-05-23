import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    return true;
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.role === 'admin') {
    router.navigate(['/admin']);
  } else {
    router.navigate(['/dashboard']);
  }

  return false;
};
