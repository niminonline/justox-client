import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from '../../common/simple-dialog/simple-dialog.component';
import { DialogData } from 'src/app/interface/interfaces';
import { UserAPIService } from 'src/app/services/user-api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private userApi: UserAPIService,
    private router: Router
  ) {}
  submitted: boolean = false;
  passwordHide: boolean = true;
  confirmPasswordHide: boolean = true;
  signupGroup!: FormGroup;
  selectedImage: File | null = null;
  @Input() submitButtonName: string = 'Signup';

  ngOnInit() {
    this.signupGroup = this.fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-z \\.]+')],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[^ ][a-z.\\-_0-9]+@[a-z0-9]+\\.[a-z]{2,10}'),
          ],
        ],
        mobile: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        image: [''],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  @Output() toParentEvent: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  toParent(data: FormGroup) {
    event?.preventDefault();
    this.toParentEvent.emit(data);
  }

  @Output() adminAdduserEvent: EventEmitter<string> =
    new EventEmitter<string>();

  adminUserAddEmit(status: string) {
    this.adminAdduserEvent.emit(status);
  }

  uploadImage(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    // console.log(event);
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];
      // console.log(this.selectedImage);
    }
  }


  passwordMatchValidator(group: AbstractControl) {
    if (group.get('password')?.value !== group.get('confirmPassword')?.value) {
      group.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    }
  }

  signupSubmit(data: any): void {
    this.submitted = true;
    if (!data.invalid) {
      // console.log(data.value);
      const { username, email, mobile, password } = data.value;
      const body = {
        username,
        email,
        mobile,
        password,
      };
      const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('password', password);
    formData.append('image', this.selectedImage as Blob);
 
      console.log("body-"+body);
      this.userApi.signup(formData).subscribe((response) => {
        console.log(response);
        if (response && response.status !== 'OK') {
          Swal.fire('Error', response.message, 'error');
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User registered successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          const currentUrl: string = this.router.url;
          console.log('url:' + currentUrl);
          if (currentUrl == '/login') {
            this.router.navigate(['/home']);
          } else {
            if (response.status) this.adminUserAddEmit(response.status);
          }
        }
      });
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }
}
