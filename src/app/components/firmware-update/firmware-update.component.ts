import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DragDirective } from '../../dragDrop.directive';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-firmware-update',
  standalone: true,
  imports: [CommonModule, MatCardModule, DragDirective, MatProgressBarModule],
  templateUrl: './firmware-update.component.html',
  styleUrl: './firmware-update.component.scss'
})
export class FirmwareUpdateComponent {
  selectedFile: any = undefined;
  @ViewChild('updateForm') updateForm: any;
  percentage: number = 0;

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
    request.open('POST', '/update-firmware');
    request.upload.addEventListener('progress', p=>{
      let w = Math.round((p.loaded / p.total)*100);
      this.percentage = w;
    });
    request.upload.addEventListener('error', () => this.resetSelectedFile());
    request.upload.addEventListener('loadend', () => this.resetSelectedFile());
    request.send(data);
  }

  resetSelectedFile() {
    this.selectedFile = undefined;
    this.percentage = 0;
  }

}
