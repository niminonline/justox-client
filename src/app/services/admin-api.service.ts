import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/interfaces';
import { AdminLoginResponse } from '../interface/interfaces';
import { verifyTokenResult } from 'src/app/interface/interfaces';

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

  private static readonly baseUrl = 'http://localhost:5000/admin' as const;

  verifySession(headers: HttpHeaders): Observable<verifyTokenResult> {
    const options = { headers: headers };
    return this.http.get(`${AdminAPIService.baseUrl}/verify-session`, options);
  }

  login(data: object): Observable<AdminLoginResponse> {
    return this.http.post(`${AdminAPIService.baseUrl}/login`, data);
  }

  loadUsers(headers: HttpHeaders): Observable<any> {
    const options = { headers: headers };

    return this.http.get(`${AdminAPIService.baseUrl}/load-users`, options);
  }

  deleteUser = (id: string, headers: HttpHeaders): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.delete(
      `${AdminAPIService.baseUrl}/delete-user/${id}`,
      options
    );
  };
  getEditUserData = (
    id: string,
    headers: HttpHeaders
  ): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.get(
      `${AdminAPIService.baseUrl}/get-user-data/${id}`,
      options
    );
  };
  updateUser = (
    data: object,
    headers: HttpHeaders
  ): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.put(
      `${AdminAPIService.baseUrl}/update-user`,
      data,
      options
    );
  };
}
