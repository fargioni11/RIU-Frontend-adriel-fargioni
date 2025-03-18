import { Component, effect, inject, input, OnInit, OnChanges, SimpleChanges, output, signal, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { filterComponent } from "./filter/filter.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SuperheroService } from '../../services/superhero.service';
import { ModalService } from '../modal/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, filterComponent, MatIconModule, MatButtonModule, MatSortModule],
  templateUrl: './grid.component.html',
})
export class GridComponent<T> implements OnChanges, OnInit {

  private readonly superheroService = inject(SuperheroService);
  private readonly modalSvc = inject(ModalService);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);

  private readonly _sort = viewChild.required<MatSort>(MatSort)
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  dataSource = new MatTableDataSource<T>([]);
  superheroDeleted = output<void>();
  superheroAdded = output<void>();
  superheroEdited = output<void>();
  sortableColumns = input<string[]>([]);
  valueToFilter = signal<string>('');

  constructor() {
    effect(() => {
      if (this.valueToFilter()) {
        this.dataSource.filter = this.valueToFilter();
      } else {
        this.dataSource.filter = '';
      }
      if (this.data()) {
        this.dataSource.data = this.data();
      }
    }, { allowSignalWrites: true });

    effect(() => {
      this.dataSource.paginator = this._paginator();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.dataSource.data = changes['data'].currentValue;
    }
  }

  ngOnInit(): void {
    this.dataSource.data = this.data();
    this.dataSource.sort = this._sort();
  }

  deleteSuperhero(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.superheroService.deleteSuperhero(id).subscribe(() => {
          this.superheroDeleted.emit();

          Swal.fire({
            title: 'Eliminado',
            text: 'El superhéroe ha sido eliminado con éxito',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        });
      }
    });
  }

  editSuperhero(data: T) {
    const modalRef = this.modalSvc.openModal<ModalComponent, { data: T; isEdit: boolean }>(
      ModalComponent,
      { data, isEdit: true }
    );

    modalRef.afterClosed().subscribe((result) => {
      if (result) {
        this.superheroEdited.emit();

        Swal.fire({
          title: 'Actualizado',
          text: 'El superhéroe ha sido actualizado con éxito',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }


}
