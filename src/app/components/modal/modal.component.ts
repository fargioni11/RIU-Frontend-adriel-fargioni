import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SuperheroService } from '../../services/superhero.service';
import Swal from 'sweetalert2';

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

    if (this._matDialogData?.isEdit) {
      const superheroId = this._matDialogData.data.id;
      this._superheroSvc.updateSuperhero(superheroId.toString(), hero).subscribe({
        next: () => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El superhéroe ha sido actualizado con éxito',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          this._dialogRef.close(true);
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar el superhéroe. Intenta nuevamente.',
            icon: 'error'
          });
        }
      });
    } else {
      this._superheroSvc.addSuperhero(hero).subscribe({
        next: () => {
          Swal.fire({
            title: 'Agregado',
            text: 'El superhéroe ha sido agregado con éxito',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          this._dialogRef.close(true);
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo agregar el superhéroe. Intenta nuevamente.',
            icon: 'error'
          });
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
      power: ['', Validators.required],
      age: ['', Validators.required]
    });
  }
}
