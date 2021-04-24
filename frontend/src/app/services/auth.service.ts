import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators'
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = {};
  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  login(data: any) {
    return this.http.post(environment.baseUrl + 'auth/login', data).pipe(catchError(this.handleError),tap(async (resData: any) => {
      await localStorage.setItem('accessToken', resData.token);
      this.authenticationState.next(true);
      return resData;
    }))
  }  

  signup(data:any){
    return this.http.post(environment.baseUrl + 'auth/signup', data)
  }

  getUser(){
    // @ts-ignore
    return jwt_decode(localStorage.getItem('accessToken'));
  }

  checkUsername(data:any) {
    return this.http.get(environment.baseUrl + 'auth/checkUsername' , data);
  }

  handleError(error:HttpErrorResponse) {
    return throwError(error.error)
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value || localStorage.getItem('accessToken');
  }

}
