import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserAPIService {
  constructor(private http: HttpClient) {}

  private static readonly baseUrl = 'http://localhost:5000' as const;

  login = (data: object): Observable<ApiResponse> => {
    return this.http.post(`${UserAPIService.baseUrl}/login`, data);
  };
  signup = (data: object): Observable<ApiResponse> => {
    return this.http.post(`${UserAPIService.baseUrl}/signup`, data);
  };
  getProfile = (id: string, headers: HttpHeaders): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.get(
      `${UserAPIService.baseUrl}/profile?_id=${id}`,
      options
    );
  };
  updateProfile = (data: object,headers: HttpHeaders): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.patch(`${UserAPIService.baseUrl}/update-profile`, data,options);
  };
}
