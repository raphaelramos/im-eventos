import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})

export class LoginLayoutComponent {
    constructor() {
        document.body.style.backgroundImage       = `url('assets/img/home-bg.jpg')`;
        document.body.style.backgroundPosition    = 'center center';
        document.body.style.backgroundRepeat      = 'no-repeat';
        document.body.style.backgroundAttachment  = 'fixed';
        document.body.style.backgroundSize        = 'cover';
    }
}
