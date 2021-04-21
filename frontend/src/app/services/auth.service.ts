import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators'
import { throwError } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = {};

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(environment.baseUrl + 'auth/login', data).pipe(catchError(this.handleError),tap(async (resData: any) => {
      await localStorage.setItem('accessToken', resData.token);
      this.getUser(resData.token);
      return resData;
    }))
  }

  getUser(token: any) {
    return this.http.post(environment.baseUrl + 'auth/get-user', {token}).subscribe((res: any) => {
      console.log(res)
    })
  }  


  signup(data:any){
    return this.http.post(environment.baseUrl + 'auth/signup', data)
  }

  autoLogin() {
    let accessToken = localStorage.getItem('accessToken')

    if(accessToken) {
        this.getUser(accessToken);
    }

    return false
  }

  handleError(error:HttpErrorResponse) {
    return throwError(error.error)
  }

}
