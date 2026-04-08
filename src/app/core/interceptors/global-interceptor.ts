import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('cart') || req.url.includes('wishlist') || req.url.includes('orders')) {
    req = req.clone({
      setHeaders: {
        token: `${localStorage.getItem('token')}`,
      },
    });
  }

  return next(req).pipe(
    catchError((err) => {
      const customError = {
        message: err.error?.message || 'Something went wrong',
        status: err.status,
        statusMsg: err?.error?.statusMsg || 'fail',
      };

      return throwError(() => customError);
    }),
  );
};
