import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Superhero } from '../../models/superhero.model';

@Injectable({providedIn: 'root'})
export class ModalService {


private readonly _dialog = inject(MatDialog);

openModal<CT, T = Superhero>(ComponentRef:ComponentType<CT>, data?: T , isEditing = false): void {
    const config = {data, isEditing};
    this._dialog.open(ComponentRef, {
        data: config,
        width: '600px'
    });
}

closeModal(): void {
    this._dialog.closeAll();
}
}