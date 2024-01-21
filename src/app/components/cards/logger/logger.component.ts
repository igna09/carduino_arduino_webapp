import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import { SocketService } from '../../../services/socket/socket.service';
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

  @ViewChild('list')
  list!: any;

  constructor(private socketService: SocketService, private viewRef: ViewContainerRef) {

  }

  ngOnInit() {
    this.socketService.getMessages().subscribe(e => {
      this.receivedMessages.push(e);

      const isScrolledToEnd = this.list.nativeElement.offsetHeight + this.list.nativeElement.scrollTop >= this.list.nativeElement.scrollHeight;

      if(isScrolledToEnd) {
        setTimeout(() => this.list.nativeElement.lastElementChild.scrollIntoView(), 1);
      }
    });
  }

}
