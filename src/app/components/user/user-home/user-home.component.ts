import { Component, OnInit } from '@angular/core';
import { UserAPIService } from 'src/app/services/user-api.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserType } from 'src/app/interface/interfaces';
import { Store } from '@ngrx/store';
import { selectUserData } from '../../../state/selectors/user.selectors';
import { retrieveUserData } from '../../../state/actions/user.actions'; 
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  constructor(private userApi: UserAPIService, private route: Router,private store: Store) {}

  username!: string;
  email!: string;
  _id!: string;
  mobile!: string;
  createdAt!: Date;

  ngOnInit() {


   this.getuserData();
  
}

  logout(){
    localStorage.removeItem('_id');
    localStorage.removeItem('userToken');
    this.route.navigate(["/login"])
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Logged out successfully'
    })

  }
   async getuserData() {



    const id: string | null = localStorage.getItem('_id');
    const authToken: string | null = localStorage.getItem('userToken');
    console.log("id, token", id,authToken)
    if(id&&authToken){


   
   this.store.dispatch(retrieveUserData());

     this.store.select(selectUserData).subscribe((userData) => {
      if (userData) {
        this.username = userData.username;
        this.email = userData.email;
        this._id = userData._id;
        this.mobile = userData.mobile;
        this.createdAt        = userData.createdAt
      } 
      // else{

      //   Swal.fire('Error', 'Unauthorized Accesspppp', 'error');
      // this.route.navigate(['/login']);
      // }
    
    })
  }
  else{
    Swal.fire('Error', 'Unauthorized Accessqq', 'error');
      this.route.navigate(['/login']);
    
  }

  }
}


















//     const id: string | null = localStorage.getItem('_id');
//     const authToken: string | null = localStorage.getItem('userToken');
//     const headers = new HttpHeaders().set(
//       'Authorization',
//       `Bearer ${authToken}`
//     );

//     // console.log('id-', id);
//     // console.log('token', authToken);

//     if (id && authToken) {
//       this.userApi.getProfile(id, headers).subscribe(
//         (response) => {
//           if (response.status !== 'OK') {
//             Swal.fire('Error', 'Unauthorized Access', 'error');
//             this.route.navigate(['/login']);
//           } else {
//             if (response.userData) {
//               this.username = response.userData.username;
//               this.email = response.userData.email;
//               this._id = response.userData._id;
//               this.mobile = response.userData.mobile;
//             }
//           }
//         },
//         (error) => {
//           console.error('An error occurred:', error);
//         }
//       );
//     } else {
//       Swal.fire('Error', 'Unauthorized Access', 'error');
//       this.route.navigate(['/login']);
//     }
//   }
// }
