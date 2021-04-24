import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpParams } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addToProduct(product: any) {
    return this.http.post(environment.baseUrl + 'collection/add-product', product);
  }

  getUserProducts() {
    return this.http.get(environment.baseUrl + 'collection/get-product');
  }

  getAdminProducts() {
    return this.http.get(environment.baseUrl + 'collection/get-admin-product');
  }

  removeProduct(key: any) {
    let params = new HttpParams();
    params = params.append('key', key);
    return this.http.delete(environment.baseUrl + 'collection/remove-product',{
      params : params
    });
  }
}
