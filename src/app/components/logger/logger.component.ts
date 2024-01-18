import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { SocketService } from '../../services/socket/socket.service';
import { LogComponent } from './log/log.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logger',
  standalone: true,
  imports: [MatCardModule, LogComponent, CommonModule],
  templateUrl: './logger.component.html',
  styleUrl: './logger.component.scss'
})
export class LoggerComponent implements OnInit {
  receivedMessages: string[] = [];

  constructor(private socketService: SocketService, private viewRef: ViewContainerRef) {

  }

  ngOnInit() {
    this.socketService.getMessages().subscribe(e => {
      this.receivedMessages.push(e);
    });
  }

}
