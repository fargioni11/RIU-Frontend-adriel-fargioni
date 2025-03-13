import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SuperheroService } from '../../services/superhero.service';
import { APP_CONSTANTS } from '../../shared/constants';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { Superhero } from '../../models/superhero.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatLabel, MatFormField, MatDialogContent, MatInput, ReactiveFormsModule, MatDialogModule, MatButton],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {

  superheroForm!: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly _matDialogData = inject(MAT_DIALOG_DATA);
  private readonly _dialogRef = inject(MatDialogRef<ModalComponent>);
  private readonly _superheroSvc = inject(SuperheroService);
  private readonly _snackBarSvc = inject(SnackBarService);

  ngOnInit(): void {
    this._buildForm();
    if (this._matDialogData?.data) {
      this.superheroForm.patchValue(this._matDialogData.data);
    }
  }

  onSubmit(): void {
    if (this.superheroForm.invalid) {
      return;
    }
  
    const hero = this.superheroForm.value;
    let message = APP_CONSTANTS.MESSAGES.SUPERHERO_UPDATED;
  
    if (this._matDialogData?.isEdit) {
      const superheroId = this._matDialogData.data.id;
      this._superheroSvc.updateSuperhero(superheroId.toString(), hero).subscribe({
        next: () => {
          this._snackBarSvc.openSnackBar(message);
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al actualizar el superhéroe:', err);
          this._snackBarSvc.openSnackBar(APP_CONSTANTS.MESSAGES.CONFIMATION);
        }
      });
    } else {
      message = APP_CONSTANTS.MESSAGES.SUPERHEROES_ADDED;
      this._superheroSvc.addSuperhero(hero).subscribe({
        next: () => {
          console.log('Superhéroe agregado correctamente');
          this._snackBarSvc.openSnackBar(message);
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al agregar el superhéroe:', err);
          this._snackBarSvc.openSnackBar(APP_CONSTANTS.MESSAGES.CONFIMATION);
        }
      });
    }
  }
  getTitle(): string {
    return this._matDialogData?.isEdit ? 'Edit Superhero' : 'Add Superhero';
  }

  private _buildForm(): void {
    this.superheroForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
}