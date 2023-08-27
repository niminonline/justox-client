import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/user/home/home.component';
import { LoginSignupFrameComponent } from './components/common/login-signup-frame/login-signup-frame.component';

const routes: Routes = [
  {path:'',component:HomeComponent,title:"Justox | Home"},
  {path:"home",redirectTo:'',pathMatch:'full'},
  {path:'login',component:LoginSignupFrameComponent,title:'Justox | Login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
