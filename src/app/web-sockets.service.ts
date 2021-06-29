import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  socket:any;
  url:string = "http://localhost:3000"

  constructor() {
    this.socket = io(this.url, { transports: ['websocket', 'polling', 'flashsocket'] });
  }

  listen(eventName:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName, (data:any)=>{
        subscriber.next(data)
      });
    });
  }
}
