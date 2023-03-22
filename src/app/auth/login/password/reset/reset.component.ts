import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './../../../services/auth.service';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./../../login.component.css']
})
export class ResetComponent implements OnInit {

    f: FormGroup;
    isLoading = false;
    errorCredentials = false;

    password: string;
    password_confirmation: string;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.f = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
            password_confirmation: [null, [Validators.required]],
            token: [this.route.snapshot.params['token'], [Validators.required]]
        });
    }

    onSubmit() {
        this.isLoading = true;
        this.authService.passwordReset(this.f.value).subscribe({
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.status === 401) {
                    this.errorCredentials = false;
                    this.isLoading = false;
                }
            }
        });
        this.router.navigate([`/login`]);
        this.snackBar.open('Faça login', '', {
            duration: 2500,
        });
    }

}
