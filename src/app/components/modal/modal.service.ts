import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({providedIn: 'root'})
export class ModalService {


private readonly _dialog = inject(MatDialog);
    
}