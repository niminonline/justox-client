import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  submitButton: string = 'Add user';
  constructor(
    private addUserDialog: MatDialogRef<AddUserComponent>,
    private router: Router
  ) {}

  closeDialog(event: Event) {
    event.preventDefault();
    this.addUserDialog.close();
  }

  userAddDone(status: string) {
    if (status == 'OK') {
      this.addUserDialog.close();
    }
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }
}
