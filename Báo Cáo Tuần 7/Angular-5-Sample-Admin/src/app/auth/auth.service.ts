import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user.model';
import {UserRs} from '../shared/model/UserRs';
import {Observable} from '../../../node_modules/rxjs';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';

@Injectable()

export class AuthService {
  public headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  // sending request to back end to register our user
  signup(user: User) {
    const body = JSON.stringify(user);
    const options = {headers: this.headers};
    return this.http.post('http://localhost:3000/api/register', body, options);
  }

  // sending request to back end to login the user
  signin(user: any): Observable<UserRs> {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = {headers: this.headers};
    return this.http.post<UserRs>('http://localhost:3000/api/login', body, options);
  }

  // logout function to be used in html file of both pages (login/register) in order to clear the localStorage from token and user id.
  logout() {
    localStorage.clear();
    location.reload();
  }

  // check if the user is logged in or not, if token is expired, token is deleted from localstorage
  isLoggedIn() {
    if (localStorage.getItem('id_token') != null) {
      return true;
    }

    return false;
  }
}
