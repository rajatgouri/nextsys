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

  getUserCollection() {
    return this.http.get(environment.baseUrl + 'collection/get-collection');
  }

  getAdminCollection() {
    return this.http.get(environment.baseUrl + 'collection/get-admin-collection');
  }

  removeCollection(key: any) {
    let params = new HttpParams();
    params = params.append('key', key);
    return this.http.delete(environment.baseUrl + 'collection/remove-collection',{
      params : params
    });
  }
}
