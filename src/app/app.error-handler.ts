import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private injector: Injector,
              private matSnackBar: MatSnackBar,
              private zone: NgZone) {
    super();
  }

  showMessage(message: string) {
    this.matSnackBar.open(`Ops: ${message}`, '', {
      duration: 4000,
    });
  }

  override handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;

      if (errorResponse.status === 401) {
        this.goToLogin();
      }

      console.error('Erro', errorResponse.error);
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.showMessage('Faça login e continue');
            break;
          case 403:
            this.showMessage(message || 'Não autorizado');
            break;
          case 404:
            this.showMessage(message || 'Recurso não encontrado. Contate o Desenvolvedor');
            break;
          case 409:
            this.showMessage(message || 'Tente novamente');
            break;
        }
      });
    }
    super.handleError(errorResponse);
  }

  goToLogin(): void {
    const router = this.injector.get(Router);
    this.zone.run(
      () => router.navigate(['/login'])
    );
  }
}
