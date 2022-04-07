import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';
import { UserDetails } from '../models/user-details.model';
import { ChatService } from './chat.service';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  userList: any;
  name;
  messageText: any;
  message;
  chattingWith: UserDetails;
  filter: any;
  general: any;
  authPicture: any;
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    public socket: Socket,
    public chat: ChatService,
    private readonly http: HttpClient
  ) {
    let authArray = [];
    let userName;
    this.auth.user$.forEach((val) => authArray.push(val));

    const myTimeout = setTimeout(addUser, 1000);

    function addUser() {
      userName = authArray[0].nickname;
      socket.emit('sign_in', userName);
    }
  }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:5000/getusers').subscribe((data) => {
      console.log(data);
    })
    this.chat.getUsers().subscribe((users) => {
      this.userList = users;
    });
    this.chat.getMessage().subscribe((message) => {
      this.chat.messages.push(message);
      console.log(message + '-------------line 41-------------');
    });
    this.chat.getAllMessages().subscribe((messageAll) => {
      this.chat.messagesAll.push(messageAll);
      console.log(messageAll + '---------line 46-----');
    });
    console.log(this.chat.chattingWith);
    this.chat.chattingWith.subscribe((user) => {
      this.chattingWith = user;
      this.filter = { $or: [{ from: user.id }, { to: user.id }] };
    });
    let a;
    this.auth.user$.subscribe((val) => {
      a = val.picture;
      const myTimeout = setTimeout(getPicture, 8000);

      function getPicture() {
        this.authPicture = a;
        console.log(this.authPicture + ' ---- line64');
      }
    });

    console.log(this.authPicture + ' -----line 66');
  }

  openChat(event, user) {
    console.log(user.value, user.key);
    this.chat.chattingWith.next({
      name: user.value,
      id: user.key,
    });
    this.chattingWith = {
      name: user.value,
      id: user.key,
    };
  }

  sendMessage() {
    if (this.chattingWith != undefined) {
      console.log('in private');
      this.message = {
        message: this.messageText,
        to: this.chattingWith.id,
        date: new Date(),
      };
      this.messageText = '';
      this.chat.sendMessage(this.message);
      console.log(this.chat.messages);
    } else {
      console.log('in general');
      this.message = {
        message: this.messageText,
        date: new Date(),
      };
      this.chat.sendMessageToAll(this.message);
    }
  }

  displayPrivate = false;

  onPrivatePress() {
    this.displayPrivate = true;
  }
}
