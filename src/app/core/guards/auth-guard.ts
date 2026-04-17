import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service.js';

export const authGuard: CanActivateFn = (route, state) => {
  const toaster = inject(ToastrService);
  const router = inject(Router);
  const auth = inject(AuthService);
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('userData');

  if (token && userData && auth.getIsLoggedIn_) return true;
  else {
    toaster.warning('Please sign in first', 'Warning', {
      timeOut: 2000,
    });
    router.navigate(['/login']);
    return false;
  }
};
