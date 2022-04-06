import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(public auth: AuthService, public socket: Socket) {
    let authArray = [];
    let userName, userEmail;
    this.auth.user$.forEach((val) => authArray.push(val));

    const myTimeout = setTimeout(addUser, 1000);

    function addUser() {
      userName = authArray[0].nickname;
      socket.emit('sign_in', userName);
    }

    function myStopFunction() {
      clearTimeout(myTimeout);
    }
  }

  ngOnInit(): void {}

  display = false;
  onPress() {
    this.display = !this.display;
  }
}
