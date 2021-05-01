import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addToCollection(collection: any) {
    return this.http.post(environment.baseUrl + 'admin/add-collection', collection);
  }

  editCollection(collection: any) {
    return this.http.put(environment.baseUrl + 'admin/edit-collection', collection);
  }
  
  removeCollection(key: any) {
    let params = new HttpParams();
    params = params.append('key', key);
    return this.http.delete(environment.baseUrl + 'collection/remove-collection',{
      params : params
    });
  }

  addProduct(product: any) {
    return this.http.post(environment.baseUrl + 'admin/add-product', product);
  }

  editProduct(product: any) {
    return this.http.put(environment.baseUrl + 'admin/edit-product', product);
  }

  removeProduct(key: any) {
    let params = new HttpParams();
    params = params.append('key', key);
    return this.http.delete(environment.baseUrl + 'admin/remove-product',{
      params : params
    });
  }

  getUsers() {
    return this.http.get(environment.baseUrl + 'admin/users');
  }

}
