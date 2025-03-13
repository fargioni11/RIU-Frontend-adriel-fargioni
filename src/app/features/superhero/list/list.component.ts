import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { GridComponent } from '../../../components/grid/grid.component';
import { ColumnKeys, Superhero } from '../../../models/superhero.model';
import { SuperheroService } from '../../../services/superhero.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [GridComponent],
  template: `
    <section>
      <app-grid [displayedColumns]="displayedColumns" [data]="data"/>
    </section>
  `,
})
export class ListComponent implements OnInit {
  private readonly _superheroService = inject(SuperheroService);
  private readonly _destroyRef = inject(DestroyRef);
  displayedColumns: ColumnKeys<Superhero> = ['id', 'name', 'actions'];
  data: Superhero[] = [];

  ngOnInit(): void {
    this.getAllSuperhero();
  }

  getAllSuperhero() {
    this._superheroService.getAllSuperhero()
      .pipe(
        tap((superheroes: Superhero[]) => {
          takeUntilDestroyed(this._destroyRef);
          this.data = superheroes.map(superhero => ({ ...superhero, actions: '' }));
        })
      )
      .subscribe();
  }
}