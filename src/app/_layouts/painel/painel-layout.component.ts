import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './painel-layout.component.html',
  styleUrls: ['./painel-layout.component.css']
})

export class PainelLayoutComponent implements OnInit, OnDestroy {

  isDarkTheme = false;
  showMenu = true;
  publicMenu;
  userBgUrl = './assets/img/user-bg.jpg';

  cobertura: string;
  usuario: any;
  username: string;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  menus = [
    { name: 'Inscrição', link: '/subscribe' },
    { name: 'Perfil', link: '/perfil' },
  ];

  constructor(public router: Router,
  private authService: AuthService,
  changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  sair() {
    this.authService.logout();
  }

  changeTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme.toString());
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

}
