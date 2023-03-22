import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../auth/interfaces/user.model';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  usuario: User;
  email: string;
  confereSenha = true;
  data = {
    antiga: '',
    nova: '',
    confere: ''
  };

  constructor(private authService: AuthService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.usuario  = JSON.parse(localStorage.getItem('user'));
    this.email    = this.usuario.email;
  }

  verificaSenha(senha) {
    if (senha) {
      this.authService.verificaSenha(senha)
      .subscribe(data => {
        this.confereSenha = !!data;
      });
    }
  }

  salvar(value) {
    this.authService.salvarSenha(value)
    .subscribe(
      () => {
        this.snackBar.open('Senha Alterada', 'Ok');
      }
    );
  }

}
