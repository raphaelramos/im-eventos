import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './../../services/auth.service';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./../login.component.css']
})
export class PasswordComponent implements OnInit {

    f: FormGroup;
    loading = false;
    errorCredentials = false;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.f = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        this.loading = true;
        this.authService.password(this.f.value).subscribe({
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.status === 401) {
                    this.errorCredentials = true;
                    this.loading = false;
                }
            }
        });
        this.router.navigate([`/login`]);
        this.snackBar.open('Verifique seu email', '', {
            duration: 2500,
        });
    }

}
