import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openModal<T, D = any>(component: any, data: D): MatDialogRef<T> {
    return this.dialog.open(component, {
      data,
    });
  }

  closeModal(): void {
    this.dialog.closeAll();
  }
}