import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminAPIService } from 'src/app/services/admin-api.service';
import { AdminLoginResponse } from 'src/app/interface/interfaces';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  constructor(
    private fb: FormBuilder,
    private adminApi: AdminAPIService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  submitted: boolean = false;
  hide: boolean = true;
  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[^ ][a-z.-_0-9]+@[a-z0-9]+\\.[a-z]{2,15}'),
      ],
    ],
    password: ['', Validators.required],
  });
  get AllControls() {
    return this.loginForm.controls;
  }
 

  onSubmit(data: any) {
    this.submitted = true;
    if (data.status === 'VALID') {
      const { email, password } = data.value;
      const credentials = { email, password };
      this.adminApi.login(credentials).subscribe((response) => {
        if (response.status !== 'OK' && response.message) {
          Swal.fire("Error", response.message, "error");
        }
        else{
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })




          this.router.navigate(['/admin/dashboard']);
        }
      });
    }
    else{
      Swal.fire("Error", "Please fill the fields without errors", "error");
    }
  }
  togglePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.hide = !this.hide;
  }

}
