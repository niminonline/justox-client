import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAPIService } from 'src/app/services/user-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private userApi: UserAPIService,
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
      this.userApi.login(credentials).subscribe((response) => {
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




          this.router.navigate(['/home']);
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
