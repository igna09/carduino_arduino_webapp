import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoggerComponent } from './components/logger/logger.component';
import { UiUpdateComponent } from './components/ui-update/ui-update.component';
import { FirmwareUpdateComponent } from './components/firmware-update/firmware-update.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoggerComponent, UiUpdateComponent, FirmwareUpdateComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './shared.scss']
})
export class AppComponent {
  title = 'carduino_arduino_webapp';
}
