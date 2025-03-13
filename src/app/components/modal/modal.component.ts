import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SuperheroService } from '../../services/superhero.service';
import { ModalService } from './modal.service';
import { APP_CONSTANTS } from '../../shared/constants';
import { SnackBarService } from '../../shared/services/snack-bar.service';

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
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _superheroSvc = inject(SuperheroService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackBarSvc = inject(SnackBarService)

  ngOnInit(): void {
    this._buildForm();
    this.superheroForm.patchValue(this._matDialog.data);
  }

  async onSubmit() {
    let message = APP_CONSTANTS.MESSAGES.SUPERHERO_UPDATED;
    const hero = this.superheroForm.value;
    if (this._matDialog.data) {
      this._superheroSvc.updateSuperhero(this._matDialog.data.id, this.superheroForm.value);
    } else {
      this._superheroSvc.addSuperhero(this.superheroForm.value);
      message = APP_CONSTANTS.MESSAGES.SUPERHEROES_ADDED;
    }
    this._snackBarSvc.openSnackBar(message)
    this._modalSvc.closeModal();
  }

  getTitle(): string {
    return this._matDialog.data ? 'Edit Superhero' : 'Add Superhero';
  }

  private _disabledForm(): void {
    this.superheroForm.disable();
  }

  private _buildForm(): void {
    this.superheroForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
}