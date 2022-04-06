import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})

export class HomepageComponent implements OnInit {
  @Input() userList: any;
  @Input() USER: any;

  constructor(public auth: AuthService, public socket: Socket) {

    let authArray = [];
    let userName;
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


  ngOnInit(): void {
    this.userList = this.getUsers();

    const myTimeout = setTimeout(list, 1000);
    function list() {
      console.log(this.userList)
      this.USER = this.userList[0];
    }




    //set
  }

  display = false;
  onPress() {
    this.display = !this.display;
  }



  getUsers() {
    let userList = [];
    let users;
    let something;
    users = this.socket.fromEvent('current_users').pipe(map((data: any) => data));
    users.forEach(val => userList.push(Object.values(val)));

  }


}
