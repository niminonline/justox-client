import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserData } from 'src/app/core/selectors/user.selectors';
import * as UserActions from '../../../core/actions/user.actions'
import * as AuthActions from '../../../core/actions/auth.actions';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss'],
})
export class UserNavbarComponent {
  constructor(private router:Router,private store: Store){}
  username!: string;

ngOnInit(){
  this.store.select(selectUserData).subscribe((userData) => {
    if (userData) {
      this.username = userData.username;
    }

});
}

logout() {
  localStorage.removeItem('_id');
  localStorage.removeItem('userToken');
  this.store.dispatch(UserActions.clearUserData());
  this.store.dispatch(AuthActions.clearAuthState());
  this.router.navigate(['/login']);
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
}