import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.base.split('/');
    const token     = localStorage.getItem('token');
    const idCelula  = localStorage.getItem('idCelula');
    const idUser    = localStorage.getItem('idUser');

    if (token && (requestUrl[2] === apiUrl[2])) {
      const newRequest = request.clone({ setHeaders: { 'Authorization': `Bearer ${token}`, 'idCelula': `${idCelula}`, 'idUser': `${idUser}`} });
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }

  }
}
