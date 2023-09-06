import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminAPIService } from 'src/app/services/admin-api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  constructor(
    private fb: FormBuilder,
    private adminApi: AdminAPIService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: string },
    private router: Router
  ) {
    this.signupGroup = this.fb.group({
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
      
    });

    this.admin_id = localStorage.getItem('admin_id');
    this.authToken = localStorage.getItem('adminToken');
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
  }
  submitted: boolean = false;
  passwordHide: boolean = true;
  confirmPasswordHide: boolean = true;
  signupGroup!: FormGroup;
  selectedImage: File | null = null;
  id = this.data.id;
  currentUserName!: string;
  currentEmail!: string;
  currentMobile!: string;
  admin_id: string | null;
  authToken: string | null;
  headers: HttpHeaders;
  ngOnInit() {
    this.getEditUserData(this.id);
    // console.log(this.currentUserName, this.currentEmail, this.currentMobile);
  }

  getEditUserData = (id: string) => {
    this.adminApi.getEditUserData(id, this.headers).subscribe((response) => {
      // console.log(response);
      if (response.userData) {
        this.currentUserName = response.userData?.username;
        this.currentEmail = response.userData?.email;
        this.currentMobile = response.userData?.mobile;
      }

      this.signupGroup.setValue({
        username: this.currentUserName,
        email: this.currentEmail,
        mobile: this.currentMobile,
      });
    });
  };

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.selectedImage = inputElement.files[0];
    }
  }

  closeDialog(event: Event) {
    event.preventDefault();
    this.dialogRef.close();
  }

  updateUser = (groupData: FormGroup) => {
    this.submitted = true;
    if (!groupData.invalid) {
      const data = {
        _id: this.id,
        username: groupData.value.username,
        email: groupData.value.email,
        mobile: groupData.value.mobile,
      };
      const formData = new FormData();
      formData.append('_id', data._id);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('mobile', data.mobile);
      formData.append('image', this.selectedImage as Blob);

      this.adminApi.updateUser(formData, this.headers).subscribe((response) => {
        // console.log(response);

        if (response.status !== 'OK') {
          Swal.fire(response.status, response.message, 'error');
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User updated successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          const currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigateByUrl(currentUrl);
            });
        }
      });
      this.dialogRef.close();
    }
  };
}
