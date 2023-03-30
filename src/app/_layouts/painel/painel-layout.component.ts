import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Subject} from 'rxjs';
import { takeUntil} from 'rxjs/operators';

import { AuthService } from '../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './painel-layout.component.html',
  styleUrls: ['./painel-layout.component.css']
})

export class PainelLayoutComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<void>();
  isScreenXSmall: boolean;

  isDarkTheme = false;
  isShowMenu = true;
  userBgUrl = './assets/img/user-bg.jpg';

  usuario: User;
  username: string;
  mobileQuery: MediaQueryList;

  menus = [
    { name: 'Inscrição', link: '/subscribe' },
    { name: 'Perfil', link: '/perfil' },
  ];
  
  constructor(public router: Router,
  private authService: AuthService,
  breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall
      ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state: BreakpointState) => {
        this.isScreenXSmall = (state.matches) ? true : false;
      });
  }

  ngOnInit() {
    this.usuario = this.authService.getUser();
    this.username = this.usuario.nome.slice(0, 24);

    // Verifica permissão de acesso ao layout
    if (this.usuario.perm !== 'adm') {
      console.error('Usuário sem permissão para /painel');
      this.router.navigate(['/login']);
    }
  
    // Verifica tema escuro
    if (localStorage.getItem('theme') === 'true') {
      this.isDarkTheme = true;
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout() {
    this.authService.logout();
  }

  changeTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme.toString());
  }

}
