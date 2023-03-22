import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Subject} from 'rxjs';
import { takeUntil} from 'rxjs/operators';

import { AuthService } from '../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css']
})

export class PublicLayoutComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  isScreenXSmall: boolean;

  isDarkTheme = false;
  userBgUrl = './assets/img/user-bg.jpg';

  menus = [
    { name: 'Inscrição', link: '/subscribe' },
  ];

  usuario: User;
  username: string;

  constructor(public router: Router,
  private authService: AuthService,
  breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((state: BreakpointState) => {
        this.isScreenXSmall = (state.matches) ? true : false;
      });
  }

  ngOnInit() {
    if(this.isLogged()) {
      this.getUser();

      // Adiciona menu
      if (this.usuario.perm === 'adm') {
        this.menus.push({ name: 'Painel', link: '/painel' });
      }
      this.menus.push({ name: 'Perfil', link: '/perfil' });
    }
    
    // Verifica tema escuro
    if (localStorage.getItem('theme') === 'true') {
      this.isDarkTheme = true;
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  getUser() {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.username = this.usuario.nome.slice(0, 24);
  }

  logout() {
    this.authService.logout();
  }

  isLogged() {
    return this.authService.check();
  }

  changeTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme.toString());
  }

}
