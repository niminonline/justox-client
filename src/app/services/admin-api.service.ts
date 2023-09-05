import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/interfaces';
import { AdminLoginResponse } from '../interface/interfaces';
import { verifyTokenResult } from 'src/app/interface/interfaces';
import { baseUrlAdmin } from 'config/constants';

@Injectable({
  providedIn: 'root',
})
export class AdminAPIService {
  admin_id: string | null;
  authToken: string | null;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.admin_id = localStorage.getItem('admin_id');
    this.authToken = localStorage.getItem('adminToken');
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authToken}`
    );
  }


  verifySession(headers: HttpHeaders): Observable<verifyTokenResult> {
    const options = { headers: headers };
    return this.http.get(`${baseUrlAdmin}/verify-session`, options);
  }

  login(data: object): Observable<AdminLoginResponse> {
    return this.http.post(`${baseUrlAdmin}/login`, data);
  }

  loadUsers(headers: HttpHeaders): Observable<any> {
    const options = { headers: headers };

    return this.http.get(`${baseUrlAdmin}/load-users`, options);
  }

  deleteUser = (id: string, headers: HttpHeaders): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.delete(
      `${baseUrlAdmin}/delete-user/${id}`,
      options
    );
  };
  getEditUserData = (
    id: string,
    headers: HttpHeaders
  ): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.get(
      `${baseUrlAdmin}/get-user-data/${id}`,
      options
    );
  };
  updateUser = (
    data: object,
    headers: HttpHeaders
  ): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.put(
      `${baseUrlAdmin}/update-user`,
      data,
      options
    );
  };
}
