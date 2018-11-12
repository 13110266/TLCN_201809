import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from '../../../node_modules/rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
 role: any;
  constructor(private authService: AuthService, private router: Router) {
  }

  // we check if the user is logged in or not
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // user is actually logged in
    this.role = localStorage.getItem('role');
    if (this.authService.isLoggedIn() && this.role == '0') {
      return true;
      // user is not logged in, return the user to the login page
    } else {
       alert('Bạn không có quyền truy cập vào');
      this.router.navigate(['/login']);
    }
  }
}
