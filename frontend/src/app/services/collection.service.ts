import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  addToCollection(collection: any) {
    return this.http.post(environment.baseUrl + 'collection/add-collection', collection);
  }

  getUserCollection(username:any) {
    let params = new HttpParams();
    if (username) {
      params = params.append('username', username);
    }
    return this.http.get(environment.baseUrl + 'collection/get-collection',{
      params: params
    });
  }

  getAdminCollection() {
    return this.http.get(environment.baseUrl + 'collection/get-admin-collection');
  }

  removeCollection(key: any) {
    let params = new HttpParams();
    params = params.append('key', key);
    console.log(key);
    return this.http.delete(environment.baseUrl + 'collection/remove-collection',{
      params : params
    });
  }
}
