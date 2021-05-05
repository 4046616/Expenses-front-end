import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // get 
  get(): Observable<any> {
      return this.http.get(`${environment.endPiont}/expenses`);
  }

  // post 
  post(data: any): Observable<any> {
      return this.http.post(`${environment.endPiont}/expenses`,  data, {responseType: 'json'});
  }
}
