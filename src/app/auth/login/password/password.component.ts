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

    form: FormGroup;
    isLoading = false;
    isError = false;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        this.isLoading = true;
        this.authService.password(this.form.value).subscribe({
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.status === 401) {
                    this.isError = true;
                    this.isLoading = false;
                }
            }
        });
        this.router.navigate([`/login`]);
        this.snackBar.open('Verifique seu email', '', {
            duration: 2500,
        });
    }

}
