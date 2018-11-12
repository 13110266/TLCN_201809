import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { ActivatedRoute } from '@angular/router';
import { SearchPipe } from './search.pipe';
import { ToastComponent } from './shared/toast/toast.component';

import {
  Router,
  Route
} from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'app works!';
  username = localStorage.getItem('username');
  islogin = this._authService.isLoggedIn();
  term: String;
  flag: Boolean;
  constructor(private searchservice: SearchService, private router: Router, public toast: ToastComponent, private _authService: AuthService, ) {
  }
  logout() {
    this._authService.logout();
    alert('logout');
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.term = '';
    this.flag = false;
    this.getWord();
    if (localStorage.getItem('loginfirst') == '1' && this.islogin) {
      this.toast.setMessage('successfully.', 'success');
      localStorage.setItem('loginfirst', null);
    }
  }
  allItems: any;
  getWord() {
    this.searchservice.wordall().subscribe(
      data => {
        this.allItems = data;
      },
      error => console.log(error),
      () => {

      }
    );
  }
  search(value: any) {
    this.term = ' ';
    this.router.navigateByUrl('search/' + value);
    location.reload();
  }
  go(value: string) {
    this.router.navigateByUrl(value);
  }


  setvalue(value: string) {
    if (value === '') {
      this.flag = false;
    }
    else
      this.flag = true;
    this.term = value;
  }
}
