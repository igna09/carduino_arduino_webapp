import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { FileService } from '../../../services/api/file.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filesystem',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './filesystem.component.html',
  styleUrl: './filesystem.component.scss'
})
export class FilesystemComponent {
    filesList: any[] = [];

    constructor(private fileService: FileService) {}

    ngOnInit(): void {
      this.fileService.getFileList("/").subscribe(res => {
        this.filesList = res;
        this.filesList.sort((a, b) => a - b);
      });
    }

    downloadFile(filename: string) {
      this.fileService.getFile(filename).subscribe(res => {
        const blob = new Blob([res], { type: 'text/csv' });
        const blobUrl = URL.createObjectURL( blob);
        const aElement = document.createElement('a');
        aElement.href = blobUrl;
        aElement.download = filename;
        aElement.style.display = 'none';
        document.body.appendChild(aElement);
        aElement.click();
        URL.revokeObjectURL(blobUrl);
        aElement.remove();
      });
    }
}
