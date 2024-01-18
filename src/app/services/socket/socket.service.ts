import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io('http://' + window.location.hostname + ':3000/');

  constructor() { }

  sendMessage(message: string){
    this.socket.emit('message', message);
  }

  getMessages() {
    let observable = new Observable<string>(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });
    return observable;
  }
}
