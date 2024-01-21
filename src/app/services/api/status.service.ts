import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  url: string = `http://${window.location.hostname}/status`;

  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get<any>(this.url);
  }
}
