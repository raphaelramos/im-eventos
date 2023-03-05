import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Evento } from '../shared/model/evento.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SubscribeService {

    constructor(private http: HttpClient) {}

    listaProximosEventos(): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${environment.base}/inscricoes/eventos`)
            .pipe(take(1));
    }

    listaOpcoes(idEvento: number): Observable<any> {
        return this.http.get<any>(`${environment.base}/inscricoes/eventos/${idEvento}`)
            .pipe(take(1));
    }

    checkCpf(cpf: string): Observable<any[]> {
        const cpfNumber = { cpf: cpf };
        return this.http.post<any[]>(`${environment.base}/inscricoes/verificar-cpf`, cpfNumber)
            .pipe(take(1));
    }

    sendFile(data): any {
        return this.http.post(`${environment.base}/inscricoes/comprovante`, data);
    }

    save(data): any {
        return this.http.post(`${environment.base}/inscricoes`, data);
    }

}
