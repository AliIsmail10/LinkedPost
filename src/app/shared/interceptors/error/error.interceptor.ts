import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);
  const toastr: ToastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      if (isPlatformBrowser(platformId)) {
        const socialToken = localStorage.getItem('socialToken');
        if (socialToken !== null) {
          toastr.error(err.message); // Correct usage of toastr instance
        }
      }
      // Rethrow the error to propagate it further
      return throwError(() => err);
    })
  );
};
