import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectUserData } from 'src/app/core/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { UserAPIService } from 'src/app/services/user-api.service';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private userApi: UserAPIService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
  ) {}

  editProfileGroup!: FormGroup;
  username!: string | undefined;
  email!: string | undefined;
  mobile!: string | undefined;
  submitted: boolean = false;


  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.store.select(selectUserData).subscribe((userData) => {
      this.username = userData?.username;
      this.email = userData?.email;
      this.mobile = userData?.mobile;
    });

    this.editProfileGroup = this.fb.group({
      username: [
        this.username,
        [Validators.required, Validators.pattern('^[A-Za-z \\.]+')],
      ],
      email: [
        this.email,
        [
          Validators.required,
          Validators.pattern('^[^ ][a-z.\\-_0-9]+@[a-z0-9]+\\.[a-z]{2,10}'),
        ],
      ],
      mobile: [
        this.mobile,
        [Validators.required, Validators.pattern('^\\d{10}$')],
      ],
    });
  }

  updateUser(group: FormGroup) {
    this.submitted=true;
    if(group.valid){

      console.log(group.value);


      this.dialogRef.close();
    }
    else{
      console.log("invalid")
    }
  }

  closeDialog(event: Event) {
    event.preventDefault();
    this.dialogRef.close();
  }
}
