import { ChangeDetectionStrategy, Component, input, model} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ MatFormFieldModule , MatInputModule, MatLabel, FormsModule],
  template: ` 
    <mat-form-field>
        <mat-label>{{label()}}</mat-label>
        <input matInput [(ngModel)]="filter" [placeholder]="placeholder()">
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class filterComponent{
    filter = model('');
    label = input<string>('Filter');
    placeholder = input<string>('Ex : Superman');
    
}
