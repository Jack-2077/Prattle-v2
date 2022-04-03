import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentSearchModule } from '@covalent/core/search';

import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

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

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    NavbarComponent,
    GeneralChatroomComponent,
  ],
  imports: [
    CovalentLayoutModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-cystsk94.us.auth0.com',
      clientId: 'jgyBuUkSsBchlFjuBUSsgUw37VQskL1Q',
    }),
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
