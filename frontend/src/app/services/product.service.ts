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
    return this.http.post(environment.baseUrl + 'product/add-product', product);
  }

  getUserProducts() {
    return this.http.get(environment.baseUrl + 'product/get-products');
  }

  getAdminProducts() {
    return this.http.get(environment.baseUrl + 'product/get-products');
  }

  removeProduct(collectionId: any, productId:any) {
    let params = new HttpParams();
    params = params.append('collectionId', collectionId);
    params = params.append('productId', productId);
    return this.http.delete(environment.baseUrl + 'product/remove-product',{
      params : params
    });
  }
}
