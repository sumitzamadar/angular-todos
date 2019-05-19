import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, FormBuilder } from '@angular/forms';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
})

export class SignInComponent implements OnInit {
    public loading = false;
    public returnUrl: string;
    public signinForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
    ) { }

    public ngOnInit() {
        // if already logged in, redirect to home
        if (localStorage.getItem('currentUser')) {
            this.router.navigate(['/']);
            return false;
        }

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.initForm();
    }

    public initForm(): void {
        this.signinForm = this.formBuilder.group({
            username: new FormControl('', Validators.compose([Validators.required])),
            password: new FormControl('', Validators.compose([Validators.required])),
        });
    }

    public signIn(formdata): void {
        this.loading = true;
        this.authenticationService.login(formdata.username, formdata.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
