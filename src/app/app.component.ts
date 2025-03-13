import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ModalService } from './components/modal/modal.service';
import { ModalComponent } from './components/modal/modal.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerService } from './interceptors/services/spinner.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly _modalService = inject(ModalService)
  public readonly spinnerSRV = inject(SpinnerService)
addSuperhero(): void {
  this._modalService.openModal<ModalComponent>(ModalComponent, {});
}

}
