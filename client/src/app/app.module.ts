import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentSearchModule } from '@covalent/core/search';

import { AuthModule } from '@auth0/auth0-angular';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GeneralChatroomComponent } from './general-chatroom/general-chatroom.component';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { LoginComponent } from './login/login.component';

const config: SocketIoConfig = { url: 'http://127.0.0.1:5000/', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    GeneralChatroomComponent,
    HomepageComponent,
    LoginComponent,
  ],
  imports: [
    CovalentLayoutModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-cystsk94.us.auth0.com',
      clientId: 'jgyBuUkSsBchlFjuBUSsgUw37VQskL1Q',
    }),
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    CovalentSearchModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
