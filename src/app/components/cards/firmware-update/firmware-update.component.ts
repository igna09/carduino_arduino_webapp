import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { DragDirective } from '../../../dragDrop.directive';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-firmware-update',
  standalone: true,
  imports: [CommonModule, DragDirective, MatProgressBarModule, CardComponent],
  templateUrl: './firmware-update.component.html',
  styleUrls: ['./firmware-update.component.scss', '../../../shared.scss']
})
export class FirmwareUpdateComponent {
  selectedFile: any = undefined;
  percentage: number = 0;
  uploading: boolean = false;

  fileBrowseHandler(event: any) {
    this.selectedFile = event.target.files[0];
  }

  fileDropHandler(event: any) {
    this.selectedFile = event[0].file;
  }

  sendUpdateFile(event: any) {
    event.preventDefault();
    event.stopPropagation();

    let data = new FormData();
    data.append("file", this.selectedFile);
    let request = new XMLHttpRequest();
    request.open('POST', `http://${window.location.hostname}/update-firmware`);
    request.upload.addEventListener('progress', p=>{
      let w = Math.round((p.loaded / p.total)*100);
      this.percentage = w;
    });
    request.upload.addEventListener('loadend', p=>{
      this.uploading = false;
    });
    request.upload.addEventListener('error', () => this.resetSelectedFile());
    request.upload.addEventListener('loadend', () => this.resetSelectedFile());
    request.send(data);

    this.uploading = true;
  }

  resetSelectedFile() {
    this.selectedFile = undefined;
    this.percentage = 0;
  }

}
