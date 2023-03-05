import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelPipe } from './tel-pipe';

@NgModule({
    declarations: [TelPipe],
    imports: [CommonModule],
    exports: [TelPipe]
})

export class TelPipeModule { }
