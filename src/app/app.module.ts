import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LoginSignupFrameComponent } from './components/user/login-signup-frame/login-signup-frame.component';
import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleDialogComponent } from './components/common/simple-dialog/simple-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UserHomeContentsComponent } from './components/user/user-home-contents/user-home-contents.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginSignupFrameComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    SimpleDialogComponent,
    DashboardComponent,
    EditUserComponent,
    AddUserComponent,
    UserProfileComponent,
    UserHomeComponent,
    AdminLoginComponent,
    UserHomeContentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, 
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
