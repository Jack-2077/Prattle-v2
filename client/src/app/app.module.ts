import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CovalentLayoutModule } from '@covalent/core/layout';

import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button/auth-button.component';

@NgModule({
  declarations: [AppComponent, AuthButtonComponent],
  imports: [
    CovalentLayoutModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'dev-cystsk94.us.auth0.com',
      clientId: 'jgyBuUkSsBchlFjuBUSsgUw37VQskL1Q',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
