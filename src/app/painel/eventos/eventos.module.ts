import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EventosComponent } from './eventos.component';

import { EventosService } from './eventos.service';
import { MaterialModule } from '../../material.module';

import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { TelPipeModule } from '../../shared/tel-pipe.module';
import { EventoComponent } from './evento/evento.component';
import { InscricoesComponent } from './inscricoes/inscricoes.component';
import { InscricaoComponent } from './inscricoes/inscricao/inscricao.component';

@NgModule({
    declarations: [EventosComponent, EventoComponent, InscricoesComponent, InscricaoComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: EventosComponent },
            { path: ':id', component: EventoComponent },
            { path: ':id/inscricoes', component: InscricoesComponent },
            { path: ':id/inscricoes/:id', component: InscricaoComponent },
        ]),
        FormsModule, ReactiveFormsModule,
        MaterialModule,
        TelPipeModule,
        NgxUiLoaderModule
    ],
    providers: [EventosService]
})
export class EventosModule { }
