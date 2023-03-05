import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube',
  templateUrl: 'youtube.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent {

  constructor(
    public dialogRef: MatDialogRef<YoutubeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _sanitizer: DomSanitizer) { }

  url() {
    const url = `https://www.youtube.com/embed/${this.data.video}?rel=0&autoplay=1`;
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
