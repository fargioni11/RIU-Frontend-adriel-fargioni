import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { GridComponent } from '../../../components/grid/grid.component';
import { ColumnKeys, Superhero } from '../../../models/superhero.model';
import { SuperheroService } from '../../../services/superhero.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { ModalService } from '../../../components/modal/modal.service';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [GridComponent, ToolbarComponent],
  template: `
    <section>
      <app-toolbar (addSuperheroEvent)="openAddSuperheroModal()" />
      <app-grid
        [displayedColumns]="displayedColumns"
        [data]="superheroes()"
        (superheroDeleted)="getAllSuperhero()"
        (superheroAdded)="onSuperheroAdded()"
        (superheroEdited)="getAllSuperhero()"
        [sortableColumns]="sortables"
      />
    </section>
  `,
})
export class ListComponent implements OnInit {
  
  private readonly _superheroService = inject(SuperheroService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _modalService = inject(ModalService);
  displayedColumns: ColumnKeys<Superhero> = ['id', 'name', 'power', 'age', 'actions'];
  sortables:ColumnKeys<Superhero> = ['id', 'name', 'power', 'age', ];
  superheroes = signal<Superhero[]>([]);
  ngOnInit(): void {
    this.getAllSuperhero();
  }

  getAllSuperhero(): void {
    this._superheroService.getAllSuperhero()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((superheroes) => {
        this.superheroes.set([...superheroes]);
      });
  }

  onSuperheroAdded(): void {
    this.getAllSuperhero();
  }

  openAddSuperheroModal(): void {
    const modalRef = this._modalService.openModal<ModalComponent, { data: Superhero; isEdit: boolean }>(
      ModalComponent,
      { data: {} as Superhero, isEdit: false }
    );

    modalRef.afterClosed().subscribe((result) => {
      if (result) {
              this.getAllSuperhero();
      } else {
        
      }
    });
  }
}