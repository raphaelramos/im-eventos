import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfilComponent } from './perfil.component';

import { AuthService } from '../auth/services/auth.service';
import { MaterialModule } from '../material.module';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { TelPipeModule } from '../shared/tel-pipe.module';

@NgModule({
    declarations: [PerfilComponent],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: PerfilComponent }
        ]),
        MaterialModule,
        TelPipeModule,
        NgxChartsModule
    ],
    providers: [AuthService]
})
export class PerfilModule { }
