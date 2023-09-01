import { Component } from '@angular/core';
import { AdminAPIService } from 'src/app/services/admin-api.service';
import { UserType } from 'src/app/interface/interfaces';
import { UsersApiResponse } from 'src/app/interface/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  searchString: string;
  readonly imageUrl:string ="http://localhost:5000/public/images/" as const;
  readonly serverUrl:string = `http://localhost:5000` as const;
  constructor(
    private adminApi: AdminAPIService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.searchString = '';
  }

  ngOnInit() {
    this.loadUsers();
  }

  addUser() {
    this.dialog.open(AddUserComponent, { width: '500px', height: '800px' });
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

  clearSearch() {
    this.searchString = '';
    this.loadUsers();
  }

  doSearch() {
    if (this.searchString.trim()) {
      this.usersData = this.usersData.filter((item: any) => {
        return (
          item.username
            .toLowerCase()
            .includes(this.searchString.toLowerCase()) ||
          item.email.toLowerCase().includes(this.searchString.toLowerCase()) ||
          item.mobile.includes(this.searchString.toLowerCase())
        );
      });
    } else {
      this.loadUsers();
    }
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

  editUser = (id: string) => {
    this.dialog.open(EditUserComponent, {
      width: '400px',
      height: '600px',
      data: { id: id },
    });
  };
}
