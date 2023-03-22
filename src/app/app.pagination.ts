import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Itens por Página';
  override firstPageLabel    = 'Início';
  override lastPageLabel     = 'Última Página';
  override nextPageLabel     = 'Próximo';
  override previousPageLabel = 'Anterior';

  override getRangeLabel = function (page: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };

}
