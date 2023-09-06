import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/interface/interfaces';
import { baseUrl } from 'config/constants';

@Injectable({
  providedIn: 'root',
})
export class UserAPIService {
  constructor(private http: HttpClient) {}


  login = (data: object): Observable<ApiResponse> => {
    return this.http.post<ApiResponse>(`${baseUrl}/login`, data);
  };
  signup = (data: object): Observable<ApiResponse> => {
    return this.http.post<ApiResponse>(`${baseUrl}/signup`, data);
  };
  getProfile = (id: string, headers: HttpHeaders): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.get<ApiResponse>(
      `${baseUrl}/profile?_id=${id}`,
      options
    );
  };
  updateProfile = (
    data: object,
    headers: HttpHeaders
  ): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.patch<ApiResponse>(
      `${baseUrl}/update-profile`,
      data,
      options
    );
  };
  updateImage = (
    data: object,
    headers: HttpHeaders
  ): Observable<ApiResponse> => {
    const options = { headers: headers };
    return this.http.put<ApiResponse>(
      `${baseUrl}/update-image`,
      data,
      options
    );
  };
}
