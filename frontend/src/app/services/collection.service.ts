import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  addToCollection(key: any) {
    return this.http.post(environment.baseUrl + 'collection/add-collection', {key: key});
  }
}
