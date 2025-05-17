import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = { role: string };

export const userGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/auth']);
    return false;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.role === 'user') {
      return true;
    } else {
      router.navigate(['/auth']);
      return false;
    }
  } catch (e) {
    router.navigate(['/auth']);
    return false;
  }
};
