import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { environment } from '@env/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const isBackendRequest = req.url.startsWith(environment.apiUrl) || req.url.startsWith('/api/');

  if (!isBackendRequest || !token) {
    return next(req);
  }

  let headers = req.headers;

  if (token && !headers.has('Authorization')) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return next(
    req.clone({
      headers,
    }),
  );
};



