import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  isDarkTheme = false;
  constructor(private swUpdate: SwUpdate) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.checkUpdate();
    }
  }

  checkUpdate() {
    // this.swUpdate.checkForUpdate().then(() =>{
    //   this.swUpdate.activateUpdate().then(() =>{
    //     console.log('update')
    //   });
    // });
  }

}
