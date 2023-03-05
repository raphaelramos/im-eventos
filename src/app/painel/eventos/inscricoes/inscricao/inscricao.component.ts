import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventosService } from '../../eventos.service';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.css']
})
export class InscricaoComponent implements OnInit {

  idInscricao = this.route.snapshot.params['id'];
  inscricao: any = [];

  constructor(private eventosService: EventosService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventosService.getInscricao(this.idInscricao)
    .subscribe(data => {
      this.inscricao = data;
    });
  }

  checkin(idInscricao) {
    this.eventosService.checkin(idInscricao)
    .subscribe(data => {
      this.inscricao.checkin = data;
    });
  }

  abrirComprovante(fileName) {
    this.eventosService.abrirComprovante(fileName)
  }

}
