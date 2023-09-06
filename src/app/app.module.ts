import { NgModule, isDevMode } from '@angular/core';
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
import { CommonNavbarComponent } from './components/navbars/common-navbar/common-navbar.component';
import { SelectImageUpdateComponent } from './components/user/select-image-update/select-image-update.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'; 
import { userReducer } from './core/reducers/user.reducer';
import { UserEffects } from './core/effects/user.effects';
import { UserNavbarComponent } from './components/navbars/user-navbar/user-navbar.component';
import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { authReducer } from './core/reducers/auth.reducer';


@NgModule({
  declarations: [
    AppComponent,
    LoginSignupFrameComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    EditUserComponent,
    AddUserComponent,
    UserProfileComponent,
    UserHomeComponent,
    AdminLoginComponent,
    UserHomeContentsComponent,
    CommonNavbarComponent,
    SelectImageUpdateComponent,
    UserNavbarComponent,
    AdminNavbarComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ user: userReducer ,auth: authReducer}, {}),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
