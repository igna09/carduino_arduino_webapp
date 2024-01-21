import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { StatusService } from '../../../services/api/status.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit {
  status: any = undefined;

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
      this.statusService.getStatus().subscribe(response => this.status = response);
  }
}
