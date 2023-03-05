import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { YoutubeComponent } from '../../shared/youtube/youtube.component';

@Component({
  selector: 'app-administracao',
  templateUrl: './administracao.component.html',
  styleUrls: ['./administracao.component.css']
})
export class AdministracaoComponent {

  ajuda() {
      this.dialog.open(YoutubeComponent, {
          width: '600px',
          data: { name: 'Administração', video: 'sYhdiIakuAs' }
      });
  }

  constructor(public dialog: MatDialog) { }

}
