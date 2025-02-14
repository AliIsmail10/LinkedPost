import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router= inject(Router)
  let platform=inject(PLATFORM_ID)

    if(isPlatformBrowser(platform)){
      if(localStorage.getItem("socialToken") !== null){
       
        return true;
      }else{
        router.navigate(['/login']);
        return false;
      }
    }else{
      return router.navigate(['/login']);
    }
  
};
