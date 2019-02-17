import { Component } from '@angular/core';

import { AppService } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestApp';

  constructor(private getDataService: AppService) {}

  getData() {
    this.getDataService.getTestData().subscribe(data => {
      console.log(data);
    })
  }
}
