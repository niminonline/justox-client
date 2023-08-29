import { Component, OnInit } from '@angular/core';
import { UserAPIService } from 'src/app/services/user-api.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserType } from 'src/app/interface/interfaces';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  constructor(private userApi: UserAPIService, private route: Router) {}

  username!: string;
  email!: string;
  _id!: string;
  mobile!: string;

  ngOnInit() {
    this.getuserData();
  }

  getuserData() {
    const id: string | null = localStorage.getItem('_id');
    const authToken: string | null = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${authToken}`
    );

    // console.log('id-', id);
    // console.log('token', authToken);

    if (id && authToken) {
      this.userApi.getProfile(id, headers).subscribe(
        (response) => {
          if (response.status !== 'OK') {
            Swal.fire('Error', 'Unauthorized Access', 'error');
            this.route.navigate(['/login']);
          } else {
            if (response.userData) {
              this.username = response.userData.username;
              this.email = response.userData.email;
              this._id = response.userData._id;
              this.mobile = response.userData.mobile;
            }
          }
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
    } else {
      Swal.fire('Error', 'Unauthorized Access', 'error');
      this.route.navigate(['/login']);
    }
  }
}
