import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserAPIService } from 'src/app/services/user-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminAPIService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  constructor(
    private fb: FormBuilder,
    private userApi: UserAPIService,
    private adminApi: AdminAPIService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}
  submitted: boolean = false;
  passwordHide: boolean = true;
  confirmPasswordHide: boolean = true;
  signupGroup!: FormGroup;
  selectedImage: File | null = null;
  id = this.data.id;
  currentUserName!: string;
  currentEmail!: string;
  currentMobile!: string;
  ngOnInit() {
    this.getEditUserData(this.id);
    console.log(this.currentUserName, this.currentEmail, this.currentMobile);
  }

  getEditUserData = (id: string) => {
    this.adminApi.getEditUserData(id).subscribe((response) => {
      if (response.userData) {
        this.currentUserName = response.userData?.username;
        this.currentEmail = response.userData?.email;
        this.currentMobile = response.userData?.mobile;

        this.signupGroup = this.fb.group({
          username: [
            this.currentUserName,
            [Validators.required, Validators.pattern('^[A-Za-z \\.]+')],
          ],
          email: [
            this.currentEmail,
            [
              Validators.required,
              Validators.pattern('^[^ ][a-z.\\-_0-9]+@[a-z0-9]+\\.[a-z]{2,10}'),
            ],
          ],
          mobile: [
            this.currentMobile,
            [Validators.required, Validators.pattern('^\\d{10}$')],
          ],
        });
      }
    });
  };

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

  closeDialog() {
    this.dialogRef.close();
  }

  updateUser = (groupData: any) => {
    this.submitted = true;
    if (!groupData.invalid) {
      const data = {
        _id: this.id,
        username: groupData.value.username,
        email: groupData.value.email,
        mobile: groupData.value.mobile,
      };
      this.adminApi.updateUser(data).subscribe((response)=>{
        console.log(response);
      })

    }
  };
}
