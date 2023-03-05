import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdministracaoComponent } from './administracao.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosFormularioComponent } from './usuarios/usuarios-formulario/usuarios-formulario.component';

import { MaterialModule } from '../../material.module';

import { FormsModule } from '@angular/forms';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from '../../shared/ngx-config';
import { NgxMaskModule } from 'ngx-mask';

import { YoutubeModule } from '../../shared/youtube/youtube.module';

@NgModule({
    declarations: [AdministracaoComponent,
        UsuariosComponent,
        UsuariosFormularioComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: AdministracaoComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'usuarios/cadastro', component: UsuariosFormularioComponent },
            { path: 'usuarios/cadastro/:id', component: UsuariosFormularioComponent }
        ]),
        MaterialModule,
        FormsModule,
        YoutubeModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxMaskModule.forRoot()
    ],
    providers: [],
    entryComponents: []
})
export class AdministracaoModule { }
