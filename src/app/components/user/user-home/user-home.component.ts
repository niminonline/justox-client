import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../../core/selectors/user.selectors';
import * as UserActions from '../../../core/actions/user.actions';
import * as AuthActions from '../../../core/actions/auth.actions';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  constructor(
    private route: Router,
    private store: Store
  ) {}

  username!: string;
  email!: string;
  _id!: string;
  mobile!: string;
  createdAt!: Date;

  ngOnInit() {
    this.getuserData();
  }

  logout() {
    localStorage.removeItem('_id');
    localStorage.removeItem('userToken');
    this.store.dispatch(UserActions.clearUserData());
    this.store.dispatch(AuthActions.clearAuthState());
    this.route.navigate(['/login']);
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Logged out successfully',
    });
  }

  async getuserData() {
    const _id: string | null = localStorage.getItem('_id');
    const token: string | null = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log('id, token', _id, token);
    if (_id && token) {
      this.store.dispatch(AuthActions.setUserId({ _id: _id }));
      this.store.dispatch(AuthActions.setUserToken({ token }));
    }

    if (_id && token) {
      this.store.dispatch(UserActions.retrieveUserData());

      this.store.select(selectUserData).subscribe((userData) => {
        if (userData) {
          this.username = userData.username;
          this.email = userData.email;
          this._id = userData._id;
          this.mobile = userData.mobile;
          this.createdAt = userData.createdAt;
        }
        // else{

        //   Swal.fire('Error', 'Unauthorized Accesspppp', 'error');
        // this.route.navigate(['/login']);
        // }
      });
    } else {
      Swal.fire('Error', 'Unauthorized Access', 'error');
      this.route.navigate(['/login']);
    }
  }
}
