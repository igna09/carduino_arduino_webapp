import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { SocketService } from '../../services/socket/socket.service';

@Component({
  selector: 'app-logger',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './logger.component.html',
  styleUrl: './logger.component.scss'
})
export class LoggerComponent {

  constructor(private socketService: SocketService) {

  }

}
