import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/user/home/home.component';
import { LoginSignupFrameComponent } from './components/user/login-signup-frame/login-signup-frame.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserHomeContentsComponent } from './components/user/user-home-contents/user-home-contents.component';

const routes: Routes = [
  {path:'',component:HomeComponent,title:"Justox"},
  {path:"home",redirectTo:'',pathMatch:'full'},
  {path:'login',component:LoginSignupFrameComponent,title:'Justox | Login',pathMatch: 'full'},
  {path: 'user-home',component: UserHomeComponent, children: [
      { path: '', component: UserHomeContentsComponent,title:'Justox | Home' },
      { path: 'user-profile', component: UserProfileComponent,title:'Justox | Profile' }
    ]
  },
  {path:'admin/login',component:AdminLoginComponent, title:'Justox ',pathMatch: 'full'},
  {path:'admin/dashboard',component:DashboardComponent, title:'Justox ',pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
