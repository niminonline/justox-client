import { Component } from '@angular/core';
import { AdminAPIService } from 'src/app/services/admin-api.service';
import { UserType } from 'src/app/interface/interfaces';
import { UsersApiResponse } from 'src/app/interface/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from '../../common/simple-dialog/simple-dialog.component';
import { DialogData } from 'src/app/interface/interfaces';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private adminApi: AdminAPIService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit() {
    this.loadUsers();
  }
  usersData!: any;
  loadUsers() {
    this.adminApi.loadUsers().subscribe((response: UsersApiResponse) => {
      if (response && response.usersData) {
        this.usersData = response.usersData;
        // console.log(this.usersData);
      }
    });
  }

  deleteUser = (id: string) => {
    Swal.fire({
      title: 'Are you sure to delete the user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminApi.deleteUser(id).subscribe((response) => {
          // console.log(response);
          if (response.status !== 'OK') {
            Swal.fire(response.status, response.message, 'error');
          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'User deleted successfully',
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
    });
  };

  editUser =(id:string)=>{
    this.dialog.open(EditUserComponent, {width: '400px',height:'600px',data: { id: id }});
  }
}
