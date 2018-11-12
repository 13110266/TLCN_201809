import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, Http} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthGuardService} from './auth/authguard.service';
import {AuthGuardADMINService} from './auth/authguard_admin.service';
import {AuthService} from './auth/auth.service';
import {PostsService} from './services/posts.service';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {HomeComponent} from './home/home.component';
import {DataService} from './services/data.service';
import {SearchService} from './services/search.service';

import {MyNewComponentComponent} from './my-new-component/my-new-component.component';

import {DangnhapComponent} from './dangnhap/dangnhap.component';
import {DangkyComponent} from './dangky/dangky.component';

import {AuthHttp, AuthConfig} from 'angular2-jwt';

import {PageComponent} from './page/page.component';
import {PagerService} from './services/pager.service';
import {SearchComponent} from './search/search.component';

import {SearchPipe} from './search.pipe';
import {ContactComponent} from './contact/contact.component';
import {HttpClientModule} from '@angular/common/http';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyNewComponentComponent,
    DangnhapComponent,
    DangkyComponent,
    PageComponent,
    SearchComponent,
    SearchPipe,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [SearchService, PostsService, PagerService, DataService, AuthGuardService, AuthService, AuthGuardADMINService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
