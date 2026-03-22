import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('cart')) {
    req = req.clone({
      setHeaders: {
        token: `${localStorage.getItem('token')}`,
      },
    });
  }

  return next(req);
};
