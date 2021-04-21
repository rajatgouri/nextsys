import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let accessToken = localStorage.getItem('accessToken');
      if(accessToken) {
        let modifiedReq = req.clone({
          params: new HttpParams().set('Authorization', 'Bearer ' + accessToken)
        })


        return next.handle(modifiedReq)

      }

    return next.handle(req)
  }
}
