import {Injectable} from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardADMINService implements CanActivate {
  role :any;
  constructor(private authService: AuthService, private router: Router) {
  }

  // we check if the user is logged in or not
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // user is actually logged in
     this.role = localStorage.getItem('role');
    if (this.authService.isLoggedIn() && this.role == '1') {
      return true;
      // user is not logged in, return the user to the login page
    } else {
      alert('Bạn không có quyền truy cập vào')
      this.router.navigate(['/login']);
        return false;
    }
  }


 canLoad(route: Route): boolean {
  // user is actually logged in
     this.role = localStorage.getItem('role');
    if (this.authService.isLoggedIn()&& this.role == '1') {
      return true;
      // user is not logged in, return the user to the login page
    } else {
    
      alert('Bạn không có quyền truy cập vào')
      this.router.navigate(['/login']);
        return false;
    }
  }
}
