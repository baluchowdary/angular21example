import { Inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  //const localData = localStorage.getItem('');
  const localData = localStorage.getItem('username_key');
  if (localData !== null && localData !== undefined && localData !== '') {
    return true;
  } else {
    console.log('AuthGuard: Access denied. Redirecting to login.');
    window.alert('Access denied. Please log in to continue.');
    return false ;
  }
};
