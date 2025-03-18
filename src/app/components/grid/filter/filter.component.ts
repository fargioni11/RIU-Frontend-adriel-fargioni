import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field>
      <mat-label>{{ label() }}</mat-label>
      <input
        matInput
        [placeholder]="placeholder()"
        [ngModel]="filter()"
        (ngModelChange)="onFilterChange($event)"
      />
    </mat-form-field>
  `,
})
export class filterComponent {
  label = input('Filter');
  placeholder = input('Ex : Superman');
  filter = input('');
  filterChange = output<string>();

  onFilterChange(value: string): void {
    this.filterChange.emit(value);
  }
}
