import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DragDirective } from '../../dragDrop.directive';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-update',
  standalone: true,
  imports: [CommonModule, MatCardModule, DragDirective, MatProgressSpinnerModule],
  templateUrl: './ui-update.component.html',
  styleUrl: './ui-update.component.scss'
})
export class UiUpdateComponent {
  filesToUpload: any = undefined;

  fileBrowseHandler(event: any) {
    this.filesToUpload = event.target.files;
  }

  uploadFiles(event: any) {
    for(let i = 0; i < this.filesToUpload.length; i++) {
      const file = {
        percentage: 0,
        file: this.filesToUpload[i]
      };
      file.percentage = 0;
      let data = new FormData();
      data.append("file", file.file);
      let request = new XMLHttpRequest();
      request.open('POST', '/');
      request.upload.addEventListener('progress', p=>{
        let w = Math.round((p.loaded / p.total)*100);
        file.percentage = w;
      });
      // request.upload.addEventListener('error', () => this.resetSelectedFile());
      // request.upload.addEventListener('loadend', () => this.resetSelectedFile());
      request.send(data);
    }
  }
}
