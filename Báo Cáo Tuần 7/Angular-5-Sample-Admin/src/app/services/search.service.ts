import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
//import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
public Rest_Url: String = 'http://localhost:3000';
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }


  search(s: any): Observable<any> {
    return this.http.get(this.Rest_Url + `/api/search/` + s, this.options);
  }

  wordall(): Observable<any> {
    return this.http.get(this.Rest_Url + '/api/wordall').map(res => res.json());
  }
}
