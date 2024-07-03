import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getFile(filename: string) {
    return this.http.post<any>(`http://${window.location.hostname}/download-file`, {filename}, {'responseType': 'blob' as 'json'});
  }

  getFileList(path: string): Observable<any[]> {
    return this.http.post<any>(`http://${window.location.hostname}/file-list`, {path});
  }

  deleteFile(filename: string) {
    return this.http.post<any>(`http://${window.location.hostname}/delete-file`, {filename});
  }
}
