import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { StatusService } from '../../../services/api/status.service';
import { CommonModule } from '@angular/common';
import { FileService } from '../../../services/api/file.service';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent implements OnInit {
  status: any = undefined;

  constructor(private statusService: StatusService, private fileService: FileService) {}

  ngOnInit(): void {
    this.statusService.getStatus().subscribe(response => this.status = response);
  }

  restart() {
    this.statusService.restart().subscribe();
  }

  // downloadLogs() {
  //   this.downloadFile('logs.txt');
  // };

  get logsFileAvailable() {
    return this.status.available_files != undefined && this.status.available_files.includes('logs.txt');
  }

  /**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
humanFileSize(bytes: number, si=false, dp=1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}
}
