import {Component, OnInit} from '@angular/core';
import {CurrentTimeService} from "./current-time.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AppStorage, City} from "./storage/app-storage";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ ]
})
export class AppComponent implements OnInit {
  constructor(private currentTimeService: CurrentTimeService, private store: AppStorage) {}

  ngOnInit(): void {
    
  }

  form: FormGroup = new FormGroup({
    city: new FormControl(''),
    time: new FormControl('')
  });

  switchCitiesClick(): void {
    // if Moscow, change to Kiev,
    // if Kiev, change to Moscow
  }
}
