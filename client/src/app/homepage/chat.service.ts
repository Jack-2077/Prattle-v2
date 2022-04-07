import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserDetails } from '../models/user-details.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chattingWith = new Subject<UserDetails>();
  messages: Message[] = [];
  messagesAll: Message[] = [];
  constructor(private socket: Socket) { }

  getUsers() {
    return this.socket.fromEvent('current_users').pipe(map((data: any) => data))
  }

  getMessage() {
    console.log(this.messages);
    return this.socket.fromEvent('message').pipe(map((data: any) => data))
  }

  getAllMessages() {
    return this.socket.fromEvent('msgAll').pipe(map((data: any) => data))
  }

  sendMessage(message: any){
    this.socket.emit('message', message);
  }

  sendMessageToAll(message: any) {
    this.socket.emit('msgAll', message)
  }
}
