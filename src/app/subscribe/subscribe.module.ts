import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SubscribeService } from './subscribe.service';
import { SubscribeComponent } from './subscribe.component';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from '../shared/ngx-config';
import { NgxMaskModule } from 'ngx-mask';

import { MaterialModule } from '../material.module';

@NgModule({
    declarations: [SubscribeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: SubscribeComponent },
        ]),
        FormsModule,
        ReactiveFormsModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxMaskModule.forRoot(),
        MaterialModule
    ],
    providers: [SubscribeService, DatePipe],
    entryComponents: []
})
export class SubscribeModule { }
