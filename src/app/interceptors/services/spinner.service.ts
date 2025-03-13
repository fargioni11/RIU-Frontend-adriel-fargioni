import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SpinnerService {

    private loadingSV = signal(false);

    readonly loadingState = this.loadingSV.asReadonly();

    showSpinner() {
        this.loadingSV.set(true);
    }
    hideSpinner() {
        this.loadingSV.set(false);
    }
}