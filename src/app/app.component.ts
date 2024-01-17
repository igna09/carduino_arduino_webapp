import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoggerComponent } from './components/logger/logger.component';
import { OtaUpdateComponent } from './components/ota-update/ota-update.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoggerComponent, OtaUpdateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'carduino_arduino_webapp';
}
