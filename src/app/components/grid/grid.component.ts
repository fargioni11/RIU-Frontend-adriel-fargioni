import { Component, effect, inject, input, OnInit, signal, viewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { filterComponent } from "./filter/filter.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SuperheroService } from '../../services/superhero.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, filterComponent, MatIconModule, MatButtonModule],
  templateUrl: './grid.component.html',
})
export class GridComponent<G> implements OnChanges, OnInit {

  superheroService = inject(SuperheroService);
  valueToFilter = signal<string>('');
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  displayedColumns = input.required<string[]>();
  data = input.required<G[]>();
  dataSource = new MatTableDataSource<G>([]);

  constructor() {
    effect(() => {
      if (this.valueToFilter()) {
        this.dataSource.filter = this.valueToFilter();
      } else {
        this.dataSource.filter = '';
      }
    });

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
  }
}