import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if running in the browser and the token exists
  const platformId = inject(PLATFORM_ID);
  
  if (isPlatformBrowser(platformId)) {
    const socialToken = localStorage.getItem('socialToken');
    
    if (socialToken !== null) {
      req = req.clone({
        setHeaders: { token: socialToken! },
      });
    }
  }

  // Pass the modified request to the next handler
  return next(req);
};
