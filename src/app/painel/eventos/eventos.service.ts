import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Evento } from '../../shared/model/evento.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class EventosService {

    constructor(private http: HttpClient) { }

    listaEventos(): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${environment.base}/painel/eventos`)
            .pipe(take(1));
    }

    listaTotalInscricoes(idEvento): Observable<any[]> {
        return this.http.get<any[]>(`${environment.base}/painel/eventos/${idEvento}/inscricoes-total`)
            .pipe(take(1));
    }

    listaOpcoes(idEvento: number): Observable<any[]> {
        return this.http.get<any[]>(`${environment.base}/inscricoes/eventos/${idEvento}/valores`)
            .pipe(take(1));
    }

    listaInscricoes(idEvento, page, results, search?, filters?): any {
        let headers = null;
        if (filters) {
          headers = new HttpHeaders({
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            'filters': JSON.stringify(filters)
          });
        }
    
        if (search) {
          return this.http.get(`${environment.base}/painel/eventos/${idEvento}/inscricoes/${page}/${results}/${search}`, { headers })
          .pipe(take(1));
        }
    
        return this.http.get(`${environment.base}/painel/eventos/${idEvento}/inscricoes/${page}/${results}`, { headers })
          .pipe(take(1));
    }

    getInscricao(idInscricao) {
      return this.http.get<any[]>(`${environment.base}/painel/eventos/inscricoes/${idInscricao}`)
            .pipe(take(1));
    }

    deleteInscricao(idInscricao) {
      return this.http.delete<any[]>(`${environment.base}/painel/eventos/inscricoes/${idInscricao}`)
            .pipe(take(1));
    }

    checkin(idInscricao) {
      return this.http.post<any[]>(`${environment.base}/painel/eventos/inscricoes-checkin/`, idInscricao)
            .pipe(take(1));
    }

    abrirListaNivel(idEvento, nivel): any {
        const url = `${environment.base}/alunos/${idEvento}/${nivel}`;
        return window.open(url);
    }

    abrirListaCpf(idEvento, tipo): any {
        const url = `${environment.base}/cpf/${idEvento}/${tipo}`;
        return window.open(url);
    }

    abrirComprovante(file): any {
      const filename = file.replace('.', '/');
      const url = `${environment.base}/inscricoes/comprovante/${filename}`;
      return window.open(url);
    }

}
