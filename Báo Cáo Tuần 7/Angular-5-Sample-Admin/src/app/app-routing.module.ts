import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MyNewComponentComponent } from './my-new-component/my-new-component.component';
import { SearchComponent } from './search/search.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { DangkyComponent } from './dangky/dangky.component';
import { AuthGuardService } from './auth/authguard.service';
import { PageComponent } from './page/page.component';
import { AuthGuardADMINService } from './auth/authguard_admin.service';


const routes: Routes = [
  { path: '', component: PageComponent },
  { path: 'page', component: PageComponent },
  { path: 'admin', component: HomeComponent, canActivate: [AuthGuardADMINService] },
  { path: 'xinchao', component: MyNewComponentComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: DangnhapComponent },
  { path: 'register', component: DangkyComponent },
  { path: 'search/:query', component: SearchComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
