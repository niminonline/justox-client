import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectImageUpdateComponent } from '../select-image-update/select-image-update.component';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../../core/selectors/user.selectors';
import { imageUrl,noImage } from 'config/constants';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit{
  constructor(private dialog: MatDialog,private store: Store) {}
  username!: string;
  email!: string;
  _id!: string;
  mobile!: string;
  createdAt!: Date;
  image!:string;
  public imageUrl:string=imageUrl;
  public noImage:string=noImage;

ngOnInit(){
  this.store.select(selectUserData).subscribe((userData) => {
    if (userData) {
      this.username = userData.username;
      this.email = userData.email;
      this._id = userData._id;
      this.mobile = userData.mobile;
      this.createdAt = userData.createdAt;
      this.image = userData.image;
    } 
})
}

editProfile(){

this.dialog.open(EditProfileComponent);

}
  updateImage() {
    this.dialog.open(SelectImageUpdateComponent);
  }
}
