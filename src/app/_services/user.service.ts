import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor() { }

    getAll() {
        return Observable.of(null).mergeMap(() => {
            // array in local storage for registered users
            const registeredUsers: User[] = JSON.parse(localStorage.getItem('users')) || [];
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));

            // check for logged in user
            if (currentUser) {
                return Observable.of(registeredUsers);
            } else {
                // return 401 not authorised if token is null or invalid
                return Observable.throw('Unauthorised');
            }
        })
        .materialize()
        .delay(500)
        .dematerialize();
    }

    create(user: User) {
        return Observable.of(null).mergeMap(() => {
            // array in local storage for registered users
            const registeredUsers: User[] = JSON.parse(localStorage.getItem('users')) || [];

            // validation
            const duplicateUser = registeredUsers.filter(ru => ru.username === user.username).length;
            if (duplicateUser) {
                return Observable.throw('Username "' + user.username + '" is already taken');
            }

            // save new user
            user.id = registeredUsers.length ? registeredUsers.length + 1 : 1;
            user.todos  = [];
            registeredUsers.push(user);
            localStorage.setItem('users', JSON.stringify(registeredUsers));

            // respond 200 OK
            return Observable.of(true);
        })
        .materialize()
        .delay(500)
        .dematerialize();
    }

    update(user: User) {
        return Observable.of(null).mergeMap(() => {
            // return this.http.delete('/api/users/' + id);
            const registeredUsers: any[] = JSON.parse(localStorage.getItem('users')) || [];
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));

            // check for logged in user
            if (currentUser) {
                // find user by id in users array
                for (let i = 0; i < registeredUsers.length; i++) {
                    const ru = registeredUsers[i];
                    if (ru.id === user.id) {
                        // update user
                        registeredUsers[i] = user;
                        localStorage.setItem('users', JSON.stringify(registeredUsers));
                        break;
                    }
                }

                // respond 200 OK
                return Observable.of(true);
            } else {
                // return 401 not authorised if token is null or invalid
                return Observable.throw('Unauthorised');
            }
        })
        .materialize()
        .delay(500)
        .dematerialize();
    }

    delete(id: number) {
        return Observable.of(null).mergeMap(() => {
            // return this.http.delete('/api/users/' + id);
            const registeredUsers: any[] = JSON.parse(localStorage.getItem('users')) || [];
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));

            // check for logged in user
            if (currentUser) {
                // find user by id in users array
                for (let i = 0; i < registeredUsers.length; i++) {
                    const user = registeredUsers[i];
                    if (user.id === id) {
                        // delete user
                        registeredUsers.splice(i, 1);
                        localStorage.setItem('users', JSON.stringify(registeredUsers));
                        break;
                    }
                }

                // respond 200 OK
                return Observable.of(true);
            } else {
                // return 401 not authorised if token is null or invalid
                return Observable.throw('Unauthorised');
            }
        })
        .materialize()
        .delay(500)
        .dematerialize();
    }
}