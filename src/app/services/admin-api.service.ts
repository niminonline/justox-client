import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/interfaces';
import { AdminLoginResponse } from '../interface/interfaces';
import { verifyTokenResult } from 'src/app/interface/interfaces';
import { baseUrlAdmin } from 'config/constants';
import { UsersApiResponse } from '../interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminAPIService {

  constructor(private http: HttpClient) {}


  verifySession(headers: HttpHeaders): Observable<verifyTokenResult> {
    const options = { headers: headers };
    return this.http.get<verifyTokenResult>(`${baseUrlAdmin}/verify-session`, options);
  }

  login(data: object): Observable<AdminLoginResponse> {
    return this.http.post<AdminLoginResponse>(`${baseUrlAdmin}/login`, data);
  }

  loadUsers(headers: HttpHeaders): Observable<UsersApiResponse> {
    const options = { headers: headers };

    return this.http.get<UsersApiResponse>(`${baseUrlAdmin}/load-users`, options);
  }

  deleteUser = (id: string, headers: HttpHeaders): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.delete<ApiResponse>(
      `${baseUrlAdmin}/delete-user/${id}`,
      options
    );
  };
  getEditUserData = (
    id: string, 
    headers: HttpHeaders
  ): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.get<ApiResponse>(
      `${baseUrlAdmin}/get-user-data/${id}`,
      options
    );
  };
  updateUser = (
    data: object,
    headers: HttpHeaders
  ): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.put<ApiResponse>(
      `${baseUrlAdmin}/update-user`,
      data,
      options
    );
  };
}
