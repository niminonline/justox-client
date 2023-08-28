import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserAPIService {
  constructor(private http: HttpClient) {}

  private static readonly baseUrl = 'http://localhost:5000' as const;

  
  login = (data: object):Observable<ApiResponse>  => {
    return this.http.post(`${UserAPIService.baseUrl}/login`, data);
  };
  signup=(data:object):Observable<ApiResponse> => {
    return this.http.post(`${UserAPIService.baseUrl}/signup`,data)
  }
  getProfile=(data:object):Observable<ApiResponse> => {
    return this.http.post(`${UserAPIService.baseUrl}/profile`,data)
  }
  updateProfile=(data:object):Observable<ApiResponse> => {
    return this.http.patch(`${UserAPIService.baseUrl}/update-profile`,data)
  }
}
