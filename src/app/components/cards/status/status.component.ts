import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit {
  status: any = undefined;

  ngOnInit(): void {
      // http request
  }
}
