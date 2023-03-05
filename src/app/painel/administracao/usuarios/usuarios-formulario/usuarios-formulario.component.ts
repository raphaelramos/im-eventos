import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../../auth/services/auth.service';
import { FormStatus } from '../../../../shared/formStatus';
import { extractErrorMessagesFromErrorResponse } from '../../../../shared/errorResponse';
import { Estados } from '../../../../shared/estados';

@Component({
  selector: 'app-usuarios-formulario',
  templateUrl: './usuarios-formulario.component.html',
  styles: []
})
export class UsuariosFormularioComponent implements OnInit {

  id: number;
  data: any = {
    perm: '',
    password: this.passwordSuggest()
  };

  estados = Estados;
  salvando = false;
  formStatus = new FormStatus();

  constructor(private _location: Location, public authService: AuthService,
    private route: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit() {
    // get inputs
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.authService.verUser(this.id)
        .subscribe((user: any) => {
          this.data = {
            id             : user.id,
            nome           : user.nome,
            email          : user.email,
            telefone       : user.telefone,
            perm           : user.perm,
            dataNascimento : user.dataNascimento,
            sexo           : user.sexo,
            estado         : user.estado,
            cidade         : user.cidade
          };
        });
    }
  }

  passwordSuggest() {
    return Math.random().toString(36).substring(7);
  }

  message(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

  salvar(value) {
    this.salvando = true;
    this.authService.salvarUsuario(value)
      .subscribe(
        () => {
          this.salvando = false;
          this.message('Usuário Salvo', '');
          this._location.back();
        },
        (errorResponse: HttpErrorResponse) => {
          this.salvando = false;
          const messages = extractErrorMessagesFromErrorResponse(errorResponse);
          this.formStatus.onFormSubmitResponse({success: false, messages: messages});
        }
      );
  }

}
