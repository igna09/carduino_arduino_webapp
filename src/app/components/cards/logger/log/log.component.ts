import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent implements OnInit {

  @Input() message: string = '';
  now!: Date;

  constructor(){}

  ngOnInit(): void {
    this.now = new Date();
  }

}
