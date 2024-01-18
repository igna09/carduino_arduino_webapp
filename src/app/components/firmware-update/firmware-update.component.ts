import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DragDirective } from '../../dragDrop.directive';

@Component({
  selector: 'app-firmware-update',
  standalone: true,
  imports: [CommonModule, MatCardModule, DragDirective],
  templateUrl: './firmware-update.component.html',
  styleUrl: './firmware-update.component.scss'
})
export class FirmwareUpdateComponent {
  selectedFile: any = undefined;
  @ViewChild('updateForm') updateForm: any;

  fileBrowseHandler(event: any) {
    this.selectedFile = event.target.files[0];
  }

  fileDropHandler(event: any) {
    this.selectedFile = event[0].file;
  }

  sendUpdateFile(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let data = new FormData(this.updateForm.nativeElement);
    let request = new XMLHttpRequest();
    request.open('POST', '/update');
    request.upload.addEventListener('progress', p=>{
      let w = Math.round((p.loaded / p.total)*100) + '%';
      if(p.lengthComputable){
          // prg.innerHTML = w;
          // prg.style.width = w;
          console.log(w);
      }
    });
    request.send(data);
  }

}
