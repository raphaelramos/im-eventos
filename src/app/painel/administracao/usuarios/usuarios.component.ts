import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { NgxUiLoaderService } from 'ngx-ui-loader';

import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { Usuario } from '../../../shared/model/usuario.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: Usuario[];

  displayedColumns = ['nome', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private ngxService: NgxUiLoaderService, private authService: AuthService,
    public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.ngxService.start();
    this.authService.listaUsuarios()
    .subscribe(data => {
      this.ngxService.stop(),
      this.dataSource.data = data;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(name, id) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: { name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        this.authService.deleteUser(id)
        .subscribe(
          () => {
            this.authService.listaUsuarios()
              .subscribe(data => { this.dataSource.data = data; });
            this.snackBar.open('Usuário Removido', '', {
              duration: 2500,
            });
        });
      }
    });
  }


}
