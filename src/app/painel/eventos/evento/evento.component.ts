import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../eventos.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  idEvento = this.route.snapshot.params['id'];
  inscricoes: any;

  constructor(private eventosService: EventosService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventosService.listaTotalInscricoes(this.idEvento)
    .subscribe(data => {
      this.inscricoes = data;
    });
  }

}
