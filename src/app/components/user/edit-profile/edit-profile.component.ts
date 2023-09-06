import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectUserData } from 'src/app/core/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { UserAPIService } from 'src/app/services/user-api.service';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { selectUserId, selectuserToken } from '../../../core/selectors/auth.selectors';
import * as UserActions from '../../../core/actions/user.actions';
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
  id!: string | null;
  token!: string | null;
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

      this.store.select(selectUserId).subscribe((_id) => {
        this.id = _id;
      });
      this.store.select(selectuserToken).subscribe((token) => {
        this.token = token;
      });
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.token}`
      );

        const data={
          _id:this.id,
          username:group.value.username,
          email:group.value.email,
          mobile:group.value.mobile
        }
        this.userApi.updateProfile(data,headers).subscribe((response)=>{

          if(response.status=='OK'){
            this.store.dispatch(UserActions.retrieveUserData());
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'User updated successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            // console.log("RESPonse from update profile=",response)
          }
          else{
            Swal.fire(response.status, response.message, 'error');
          }
        })
      


      this.dialogRef.close();
    }
    else{
      console.error("invalid")
    }
  }

  closeDialog(event: Event) {
    event.preventDefault();
    this.dialogRef.close();
  }
}
