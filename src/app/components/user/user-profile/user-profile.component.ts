import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectImageUpdateComponent } from '../select-image-update/select-image-update.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  constructor(private dialog: MatDialog ) {}

  updateImage() {
    this.dialog.open(SelectImageUpdateComponent);
  }



}
