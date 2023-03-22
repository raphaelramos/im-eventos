import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './../services/auth.service';

import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  isError = false;
  loginMsg: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private deviceService: DeviceDetectorService) {
        document.body.style.backgroundImage       = `url('assets/img/home-bg.jpg')`;
        document.body.style.backgroundPosition    = 'center center';
        document.body.style.backgroundRepeat      = 'no-repeat';
        document.body.style.backgroundAttachment  = 'fixed';
        document.body.style.backgroundSize        = 'cover';
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    this.form.controls['email'].valueChanges.subscribe(value => {
      this.mask(value);
    });

    if (this.route.snapshot.params['redirect']) {
      return this.authService.redirect();
    }
  }

  emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email)
  }

  onSubmit() {
    this.isLoading = true;
    this.isError = false;
    this.loginMsg = null;

    let email = this.form.value.email;
    if(!this.emailIsValid(email)) {
      email = this.replaceMask(this.form.value.email);
    }

    const deviceInfo = this.deviceService.getDeviceInfo();
    const device = deviceInfo.browser+' '+deviceInfo.os;

    const login = {
      email: email,
      password: this.form.value.password,
      device_name: device
    }
    this.authService.login(login).subscribe({
        error: (errorResponse: HttpErrorResponse) => {
          this.isError = true;
          switch (errorResponse.status) {
            case 400:
              this.loginMsg = 'Email ou senha inválidos.';
              break;
            case 429:
              this.loginMsg = 'Você poderá entrar daqui 1 minuto.';
              break;
            default:
              this.loginMsg = 'Sem conexão com o servidor. Tente novamente';
          }
        }
      }
    );
  }

  replaceMask(value) {
    return value.replace('(', '')
        .replace(')', '')
        .replace(' ', '')
        .replace('-', '');
  }

  mask(value) {
    let string = value.replace(/[0-9]/g, '')
    string = this.replaceMask(string);

    // contains letters
    if (string || value.length < 5) {
      return;
    }

    // apply phone mask
    const pattern = '(**) *****-****';

    if (value.keyCode === 8 || value.key === 'Backspace' || value.keyCode === 46 || value.key === 'Delete') {
        if (value.length) {
          //remove all trailing formatting
          while (value.length && pattern[value.length] && pattern[value.length] !== '*') {
              value = value.substring(0, value.length - 1);
          }
          //remove all leading formatting to restore placeholder
          if (pattern.substring(0, value.length).indexOf('*') < 0) {
              value = value.substring(0, value.length - 1);
          }
        }
    }
    
    //apply mask characters
    const reserve = pattern.replace(/\*/, 'g');
    let applied = '';
    let ordinal = 0;
    for (let i = 0; i < value.length; i++) {
      //enforce pattern limit
      if (i < pattern.length) {
          //match mask
          if (value[i] === pattern[ordinal]) {
              applied += value[i];
              ordinal++;
          } else if (reserve.indexOf(value[i]) > -1) {
              //skip other reserved characters
          } else {
              //apply leading formatting
              while (ordinal < pattern.length && pattern[ordinal] !== '*') {
                  applied += pattern[ordinal];
                  ordinal++;
              }
              applied += value[i];
              ordinal++;
              //apply trailing formatting
              while (ordinal < pattern.length && pattern[ordinal] !== '*') {
                  applied += pattern[ordinal];
                  ordinal++;
              }
          }
        }
    }
    this.form.controls['email'].patchValue(applied, {emitEvent: false});
  }

}
