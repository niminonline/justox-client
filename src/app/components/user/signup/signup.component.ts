import { Component } from '@angular/core';
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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userApi: UserAPIService
  ) {}
  submitted: boolean = false;
  passwordHide: boolean = true;
  confirmPasswordHide: boolean = true;
  signupGroup!: FormGroup;
  selectedImage: File | null = null;

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

  onImageChange(event: any) {
    console.log(event);
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      if (file) {
        this.selectedImage = file;
      }
      // this.signupGroup.patchValue({ image: file });
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
        image: this.selectedImage,
      };
      // console.log(body);
      this.userApi.signup(body).subscribe((response) => {
        console.log(response);
      });
    } else {
      this.dialog.open(SimpleDialogComponent, {
        width: '400px',
        data: {
          title: 'Error',
          content: 'Please fill the fields without errors',
        } as DialogData,
      });
    }
  }
}
