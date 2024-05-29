import { AfterContentInit, Component, ContentChild, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import { SocketService } from '../../../services/socket/socket.service';
import { LogComponent } from './log/log.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-logger',
  standalone: true,
  imports: [LogComponent, CommonModule, CardComponent],
  templateUrl: './logger.component.html',
  styleUrl: './logger.component.scss'
})
export class LoggerComponent implements OnInit {
  receivedMessages: string[] = [];

  @ViewChild('content')
  list!: any;

  constructor(private socketService: SocketService, private viewRef: ViewContainerRef) {

  }

  ngOnInit() {
    this.socketService.getMessages().subscribe(e => {
      const listContainer = this.list.nativeElement.parentElement;

      const isScrolledToEnd = listContainer.scrollTop === (listContainer.scrollHeight - listContainer.clientHeight);

      this.receivedMessages.push(e);

      if(isScrolledToEnd) {
        setTimeout(() => listContainer.scrollTop = listContainer.scrollHeight, 1);
      }
    });
  }

}
