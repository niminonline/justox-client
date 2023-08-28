import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import { ApiResponse } from '../interface/interfaces';
import { AdminLoginResponse } from '../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminAPIService {

  constructor(private http:HttpClient) { }
  private static readonly baseUrl = 'http://localhost:5000/admin' as const;
  login(data:object):Observable<AdminLoginResponse>{
    return this.http.post(`${AdminAPIService.baseUrl}/login`,data)
  }
  loadUsers():Observable<any>{
    return this.http.get(`${AdminAPIService.baseUrl}/load-users`)
  }

  deleteUser=(id:string):Observable<ApiResponse>=>{
    return this.http.delete(`${AdminAPIService.baseUrl}/delete-user/${id}`)
  }
  getEditUserData=(id:string):Observable<ApiResponse>=>{
    return this.http.get(`${AdminAPIService.baseUrl}/get-user-data/${id}`)
  }
  updateUser=(data:object):Observable<ApiResponse>=>{
    return this.http.put(`${AdminAPIService.baseUrl}/update-user`,data)
  }

}
