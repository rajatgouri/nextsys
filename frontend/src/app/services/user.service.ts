import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpParams } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  profileUpload(data: any) {
    return this.http.post(environment.baseUrl + 'auth/upload/profile', data)
  } 

  backgroundUpload(data: any) {
    return this.http.post(environment.baseUrl + 'auth/upload/background', data)
  } 

  getImages(username: any) {
    let params = new HttpParams();
    params = params.append('userName', username);
    return this.http.get(environment.baseUrl + 'auth/getImages', {
      params: params
    })
  } 
}
