import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const toaster = inject(ToastrService);
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('userData');

  if (token && userData) return true;
  else {
    toaster.warning('Please sign in first', 'Warning', {
      timeOut: 2000,
    });
    router.navigate(['/login']);
    return false;
  }
};
