import { Component } from '@angular/core';
import { AdminAPIService } from 'src/app/services/admin-api.service';
import { UsersApiResponse } from 'src/app/interface/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { HttpHeaders } from '@angular/common/http';
import { imageUrl,noImage } from 'config/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  searchString: string;

  admin_id: string | null;
  authToken: string | null;
  headers: HttpHeaders;
  public imageUrl: string = imageUrl;
  public noImage: string = noImage;

  constructor(
    private adminApi: AdminAPIService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.searchString = '';
    this.admin_id = localStorage.getItem('admin_id');
    this.authToken = localStorage.getItem('adminToken');
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
  }

  ngOnInit() {
    this.loadUsers();
  }

  addUser() {
    this.dialog.open(AddUserComponent, { width: '600px', height: '850px' });
  }

  usersData!: any;
  loadUsers() {
    if (this.admin_id && this.authToken) {
      this.adminApi.loadUsers(this.headers).subscribe(
        (response: UsersApiResponse) => {
          if (response.status !== 'OK') {
            if (response.status == 'Authentication Failure') {
              Swal.fire('Error', 'Unauthorized Access', 'error');
              this.router.navigate(['/admin/login']);
            } else {
              Swal.fire(response.status, response.message, 'error');
            }
          } else {
            if (response && response.usersData) {
              // console.log(response)
              this.usersData = response.usersData;
            }
          }
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
    } else {
      Swal.fire('Error', 'Unauthorized Access', 'error');
      this.router.navigate(['/admin/login']);
    }
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
        if (this.admin_id && this.authToken) {
          this.adminApi.deleteUser(id, this.headers).subscribe(
            (response) => {
              if (response.status !== 'OK') {
                if (response.status == 'Authentication Failure') {
                  Swal.fire('Error', 'Unauthorized Access', 'error');
                  this.router.navigate(['/admin/login']);
                } else {
                  Swal.fire(response.status, response.message, 'error');
                }

                // Swal.fire('Error', 'Unauthorized Access', 'error');
                // this.router.navigate(['/admin/login']);
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
            },
            (error) => {
              console.error('An error occurred:', error);
            }
          );
        } else {
          Swal.fire('Error', 'Unauthorized Access', 'error');
          this.router.navigate(['/admin/login']);
        }

        // this.adminApi.deleteUser(id,this.headers).subscribe((response) => {
        //   // console.log(response);
        //   if (response.status !== 'OK') {
        //     Swal.fire(response.status, response.message, 'error');
        //   } else {
        //     Swal.fire({
        //       position: 'center',
        //       icon: 'success',
        //       title: 'User deleted successfully',
        //       showConfirmButton: false,
        //       timer: 1500,
        //     });
        //     const currentUrl = this.router.url;
        //     this.router
        //       .navigateByUrl('/', { skipLocationChange: true })
        //       .then(() => {
        //         this.router.navigateByUrl(currentUrl);
        //       });
        //   }
        // });
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
