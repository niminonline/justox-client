import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAPIService } from 'src/app/services/user-api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

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
    public selectImageDialog: MatDialogRef<SelectImageUpdateComponent>
  ) {
    this._id = localStorage.getItem('_id');
    this.authToken = localStorage.getItem('userToken');
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
  }
  submitted: boolean = false;
  selectedFile!: File | null;
  _id: string | null;
  headers: HttpHeaders;
  authToken: string | null;

  imageOnChange(event: Event) {
    // console.log(event);
    const imageElement: HTMLInputElement = event.target as HTMLInputElement;
    //  console.log("element",imageElement);
    //  console.log("files ",imageElement.files);
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
    formData.append('_id', this._id as string);
    formData.append('image', this.selectedFile as Blob);
    console.log('sel file--', this.selectedFile);

    if (this._id && this.authToken &&group.valid)
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
          const currentUrl = this.router.url;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigateByUrl(currentUrl);
            });
        }
      });
  }
}
