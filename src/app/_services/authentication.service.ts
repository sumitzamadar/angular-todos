import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    public login(username: string, password: string) {
        return Observable.of(null).mergeMap(() => {
            // array in local storage for registered users
            const registeredUsers: any[] = JSON.parse(localStorage.getItem('users')) || [];

            // find if any user matches login credentials
            const filteredUsers = registeredUsers.filter((user) => {
                return user.username === username && user.password === password;
            });

            if (filteredUsers.length) {
                // if login details are valid return 200 OK with user details and fake jwt token
                const user = filteredUsers[0];
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                return Observable.of(user);
            } else {
                // else return 400 bad request
                return Observable.throw('Username or password is incorrect');
            }
        })
        .materialize()
        .delay(500)
        .dematerialize();
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}