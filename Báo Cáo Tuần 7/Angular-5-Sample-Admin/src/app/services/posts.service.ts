import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {
public Rest_Url:String ='http://localhost:3000/api/';
  constructor(private http: Http) { }
  // Get all posts from the API
  getAllPosts() {
    return this.http.get(this.Rest_Url+'getall')
      .map(res => res.json());
  }
}
