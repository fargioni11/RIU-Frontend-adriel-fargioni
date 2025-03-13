import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { MatCardModule } from '@angular/material/card';
import { ModalService } from './components/modal/modal.service';
import { ModalComponent } from './components/modal/modal.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent , MatCardModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly _modalService = inject(ModalService) 
addSuperhero(): void {
  this._modalService.openModal<ModalComponent>(ModalComponent);
}

}
