import { Component, ViewChild } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DragDirective } from '../../dragDrop.directive';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

export enum UploadCardStatus {
  FilesNotSelected,
  FilesSeletected,
  Uploading,
  UploadFinished
}

@Component({
  selector: 'app-ui-update',
  standalone: true,
  imports: [CommonModule, MatCardModule, DragDirective, MatProgressSpinnerModule],
  templateUrl: './ui-update.component.html',
  styleUrls: ['./ui-update.component.scss', '../../shared.scss']
})
export class UiUpdateComponent {
  filesToUpload: any[] = []; ;
  status: UploadCardStatus = UploadCardStatus.FilesNotSelected;
  @ViewChild('fileInputUiUpdate') fileInputUiUpdate: any = undefined;
  uploadPercentage: number = 0;

  fileBrowseHandler(event: any) {
    for(let i = 0; i < event.target.files.length; i++) {
      const file = {
        percentage: 0,
        file: event.target.files[i]
      };
      this.filesToUpload.push(file);
    }
    this.status = UploadCardStatus.FilesSeletected;
  }

  manageButtonClick(event: any){
    event.preventDefault();
    event.stopPropagation();

    switch(this.status) {
      case UploadCardStatus.FilesSeletected:
        this.uploadFiles();
        break;
      case UploadCardStatus.UploadFinished:
        this.resetFilesToUpload();
        break;
    }
  }

  private uploadFiles() {
    /*this.filesToUpload.forEach(fileToUpload => {
      fileToUpload.percentage = 0;
      let data = new FormData();
      data.append("file", fileToUpload.file);
      let request = new XMLHttpRequest();
      request.open('POST', '/file-upload');
      request.upload.addEventListener('progress', p=>{
        let w = Math.round((p.loaded / p.total)*100);
        fileToUpload.percentage = w;
      });
      request.upload.addEventListener('loadend', p=> {
        if(!this.filesToUpload.some(e => e.percentage < 100)) {
          this.status = UploadCardStatus.UploadFinished;
        }
      });
      request.send(data);
    });
    this.status = UploadCardStatus.Uploading;*/
    this.status = UploadCardStatus.Uploading;
    this.uploadPercentage = 0;
    let data = new FormData();
    this.filesToUpload.forEach(fileToUpload => {
      data.append("file_" + fileToUpload.file.name.replace('', '_'), fileToUpload.file);
    });
    let request = new XMLHttpRequest();
    request.open('POST', '/file-upload');
    request.upload.addEventListener('progress', p=>{
      let w = Math.round((p.loaded / p.total)*100);
      this.uploadPercentage = w;
    });
    request.upload.addEventListener('loadend', p=> {
        this.status = UploadCardStatus.UploadFinished;
    });
    request.send(data);
  }

  private resetFilesToUpload() {
    this.filesToUpload = [];
    this.fileInputUiUpdate.nativeElement.value = '';
    this.status = UploadCardStatus.FilesNotSelected;
  }

  get buttonDisabled() {
    return this.status === UploadCardStatus.Uploading;
  }

  get buttonLabel() {
    switch(this.status) {
      case UploadCardStatus.FilesSeletected:
        return 'Upload';
      case UploadCardStatus.Uploading:
        return 'Uploading...';
      case UploadCardStatus.UploadFinished:
        return 'Clear';
      default:
        return '';
    }
  }

  get cardClickable() {
    return this.status === UploadCardStatus.FilesNotSelected || this.status === UploadCardStatus.FilesSeletected;
  }

  get buttonClickable() {
    return this.status === UploadCardStatus.UploadFinished;
  }

  get isUploading() {
    return this.status === UploadCardStatus.Uploading;
  }

  get canRemoveFile() {
    return this.status === UploadCardStatus.FilesSeletected || this.status === UploadCardStatus.FilesNotSelected;
  }

  removeFile(event: any, file: any) {
    event.preventDefault();
    event.stopPropagation();

    this.filesToUpload.splice(this.filesToUpload.findIndex(e => e == file), 1);
  }
}
