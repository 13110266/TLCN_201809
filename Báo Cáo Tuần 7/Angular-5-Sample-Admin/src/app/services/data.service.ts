import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
//import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  public Rest_Url: String = 'http://localhost:3000';
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getUsers(): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/users').map(res => res.json());
  }
  countUsers(): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/users/count').map(res => res.json());
  }

  addUser(user): Observable<any> {
    return this.http.post(this.Rest_Url + '/api/users', JSON.stringify(user), this.options);
  }

  addUser2(user): Observable<any> {
    return this.http.post(this.Rest_Url + '/api/dangky', JSON.stringify(user), this.options);
  }
  addNew(user): Observable<any> {
    return this.http.post(this.Rest_Url + '/api/register', JSON.stringify(user), this.options);
  }

  getUser(user): Observable<any> {
    return this.http.get(this.Rest_Url + `/api/users/${user._id}`, this.options);
  }

  editUser(user): Observable<any> {
    return this.http.put(this.Rest_Url + `/api/edit/${user._id}`, JSON.stringify(user), this.options);
  }

  deleteUser(user): Observable<any> {
    return this.http.delete(this.Rest_Url + `/api/users/${user._id}`, this.options);
  }
  get_random_stt(idtopic: string, stt: number): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/get_random_stt/' + idtopic + "/" + stt).map(res => res.json());
  }

  getloadfirst(idtopic: string): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/loadfirst/' + idtopic).map(res => res.json());
  }


}

