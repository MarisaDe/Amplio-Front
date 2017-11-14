import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { TopNavComponent } from "./navbars/top-nav.component";
import { routing } from "./app.routing"
import { LeftNavComponent } from "./navbars/left-nav.component";
import { RightNavComponent } from "./navbars/right-nav.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopNavComponent,
    LeftNavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
