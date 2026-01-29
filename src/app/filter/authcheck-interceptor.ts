import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authCheckInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const router = inject(Router);
  const authToken = localStorage.getItem('authdata');

  // Skip adding headers for login/register to avoid preflight issues on auth endpoints
  //const isAuthRequest = req.url.endsWith('/saveusermodel') || req.url.endsWith('/authenticate') req.url.endsWith('/getusermodel');
  const isAuthRequest = req.url.endsWith('/saveusermodel') || req.url.endsWith('/authenticate');

  let authReq = req;
  if (authToken && !isAuthRequest) {
    authReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // If status is 0, it's usually a CORS block or Network down
      if (error.status === 0) {
        console.error('CORS Error or Network Unreachable. Check Backend CORS config.');
      }
      
      if (error.status === 401) {
        localStorage.removeItem('authdata');
        router.navigate(['/login']);
      }
      
      return throwError(() => error);
    })
  );
};