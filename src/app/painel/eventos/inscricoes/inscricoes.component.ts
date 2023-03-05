import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EventosService } from '../eventos.service';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inscricoes',
  templateUrl: './inscricoes.component.html',
  styleUrls: ['./inscricoes.component.css']
})
export class InscricoesComponent implements OnInit {

  idEvento = this.route.snapshot.params['id'];
  opcoes = [];

  page = 1;
  results = 12;
  total = 0;
  searchText = '';
  idOpcao = '0';

  displayedColumns = ['#', 'nome', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private eventosService: EventosService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.load();
    this.eventosService.listaOpcoes(this.idEvento)
    .subscribe(data => {
      this.opcoes = data;
    });
  }

  load() {
    this.ngxService.start();
    this.eventosService.listaInscricoes(this.idEvento, this.page, this.results, this.searchText, this.filters())
    .subscribe(res => {
      this.ngxService.stop(),
      this.dataSource.data = res.data;
      // Tamanho total dos resultados, altera na primeira consulta
      if (this.page == 1) {
        this.total = res.total;
      }
    })
  }

  filters() {
    return {
      'idOpcao': this.idOpcao
    };
  }

  search(text) {
    this.searchText = text.srcElement.value;
    this.page = 1;
    this.load();
  }

  getNext(event) {
    this.results = event.pageSize;
    this.page = event.pageIndex + 1;
    this.load();
  }

  excluir(id, name) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: { name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        this.eventosService.deleteInscricao(id)
        .subscribe(
        () => {
          this.snackBar.open('Inscricão Removido', '', {
            duration: 2500,
          });
          this.load();
        });
      }
    });
      
  }

  abriListaNivel(nivel) {
    this.eventosService.abrirListaNivel(this.idEvento, nivel);
  }

  abriListaCpf(tipo) {
    this.eventosService.abrirListaCpf(this.idEvento, tipo);
  }

}
