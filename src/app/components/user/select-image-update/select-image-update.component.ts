import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAPIService } from 'src/app/services/user-api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  selectUserId,
  selectuserToken,
} from '../../../core/selectors/auth.selectors';
import * as UserActions from '../../../core/actions/user.actions';

@Component({
  selector: 'app-select-image-update',
  templateUrl: './select-image-update.component.html',
  styleUrls: ['./select-image-update.component.scss'],
})
export class SelectImageUpdateComponent {
  constructor(
    private fb: FormBuilder,
    private userApi: UserAPIService,
    private router: Router,
    public selectImageDialog: MatDialogRef<SelectImageUpdateComponent>,
    private store: Store
  ) {
    this.store.select(selectUserId).subscribe((_id) => {
      this.id = _id;
    });
    this.store.select(selectuserToken).subscribe((token) => {
      this.token = token;
    });
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

  }
  id!: string | null;
  token!: string | null;

  submitted: boolean = false;
  selectedFile!: File | null;
  headers: HttpHeaders;

  imageOnChange(event: Event) {
    const imageElement: HTMLInputElement = event.target as HTMLInputElement;
    if (imageElement.files && imageElement.files[0]) {
      this.selectedFile = imageElement.files[0];
    }
  }

  fileUploadGroup: FormGroup = this.fb.group({
    imageField: ['', Validators.required],
  });

  closeDialog() {
    event?.preventDefault();
    this.selectImageDialog.close();
  }

  imageSubmit(group: FormGroup) {
    event?.preventDefault();
    this.submitted = true;
    const formData: FormData = new FormData();
    formData.append('_id', this.id as string);
    formData.append('image', this.selectedFile as Blob);
    // console.log('sel file--', this.selectedFile);

    if (this.id && this.headers)
      this.userApi.updateImage(formData, this.headers).subscribe((response) => {
        this.closeDialog();
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
          
          this.store.dispatch(UserActions.retrieveUserData());
        }
      });
  }
}
