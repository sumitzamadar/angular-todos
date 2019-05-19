import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { HomeComponent } from './home/index';
import { SignUpComponent } from './signup/index';
import { SignInComponent } from './signin/index';
import { TodolistComponent } from './todolist/index';
import { AlertComponent } from './alert/index';

import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRouting
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        SignUpComponent,
        SignInComponent,
        TodolistComponent,
        AlertComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
