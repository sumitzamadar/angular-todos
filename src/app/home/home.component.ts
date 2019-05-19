import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService } from '../_services/index';
import { User } from '../_models/index';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private router: Router
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers()});
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe((users) => { this.users = users; });
    }

    private logOut(): boolean {
        // reset login status
        this.authenticationService.logout();
        this.router.navigate(['/signin']);
        return false;
    }
}