import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <mat-toolbar>
      <mat-toolbar-row>
        <span>Riu Frontend Adriel Fargioni</span>
        <span class="example-spacer"></span>
        <a mat-button (click)="clickAddSuperhero()">
          <mat-icon class="example-icon" aria-hidden="false" aria-label="Example user verified icon">add_parson</mat-icon>
          <span>Add Superhero</span>
        </a>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
})
export class ToolbarComponent {
  addSuperheroEvent = output<void>();

  clickAddSuperhero(): void {
    this.addSuperheroEvent.emit();
  }
}