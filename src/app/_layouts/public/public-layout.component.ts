import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css']
})

export class PublicLayoutComponent implements OnInit, OnDestroy {

  isDarkTheme = false;
  publicMenu;
  userBgUrl = './assets/img/user-bg.jpg';

  menus = [
    { name: 'Inscrição', link: '/subscribe' },
  ];

  usuario: any;
  username: string;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public router: Router,
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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

  getUser() {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.username = this.usuario.nome.slice(0, 24);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  sair() {
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
