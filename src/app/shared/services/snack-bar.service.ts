import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class SnackBarService {
   private readonly snackBar = inject(MatSnackBar);

   openSnackBar(message: string, action= 'Ok'):void {
    this.snackBar.open(message, action, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
    })
   }
}