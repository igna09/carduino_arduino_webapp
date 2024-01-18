import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = new WebSocket('ws://' + window.location.hostname + '/ws');

  constructor() { }

  sendMessage(message: string){
    this.socket.send(message);
  }

  getMessages() {
    let observable = new Observable<string>(observer => {
      this.socket.addEventListener('message', (e) => {
        observer.next(e.data);
      });
      return () => { this.socket.close(); };
    });
    return observable;
  }
}
