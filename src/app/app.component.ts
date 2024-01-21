import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoggerComponent } from './components/cards/logger/logger.component';
import { UiUpdateComponent } from './components/cards/ui-update/ui-update.component';
import { FirmwareUpdateComponent } from './components/cards/firmware-update/firmware-update.component';
import { StatusComponent } from './components/cards/status/status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoggerComponent, UiUpdateComponent, FirmwareUpdateComponent, StatusComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './shared.scss']
})
export class AppComponent {
  title = 'carduino_arduino_webapp';
}
