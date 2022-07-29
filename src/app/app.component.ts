import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrentTimeService} from './current-time.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AppStorage, City} from './storage/app-storage';
import {switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ ]
})
export class AppComponent implements OnInit, OnDestroy {
  moscowSub = Subscription.EMPTY;
  kievSub = Subscription.EMPTY;
  moscowTime$: BehaviorSubject<Date>;
  kievTime$: BehaviorSubject<Date>;

  constructor(private currentTimeService: CurrentTimeService, private store: AppStorage) {}

  ngOnInit(): void {
    this.store.selectedCity$
        .pipe(
            tap(city => this.form.controls.city.setValue(city)),
            switchMap(city => this.getTime(city))
        )
        .subscribe(time => this.form.controls.time.setValue(time));
  }

  form: FormGroup = new FormGroup({
    city: new FormControl(''),
    time: new FormControl('')
  });

  switchCitiesClick(): void {
    this.store.changeSelectedCity(this.form.controls.city.value === 'Moscow' ? 'Kiev' : 'Moscow')
  }

  getTime(city: City): Observable<Date> {
    if (city === 'Moscow') {
      if (!this.kievTime$) {
        this.moscowSub = this.currentTimeService.currentTimeMoscow$
            .subscribe(time => {
              if (!this.moscowTime$) {
                this.moscowTime$ = new BehaviorSubject<Date>(time);
              } else {
                this.moscowTime$.next(time);
              }
            });
      }
      return this.moscowTime$;
    } else {
      if (!this.kievTime$) {
        this.kievSub = this.currentTimeService.currentTimeKiev$
            .subscribe(time => {
              if (!this.kievTime$) {
                this.kievTime$ = new BehaviorSubject<Date>(time);
              } else {
                this.kievTime$.next(time);
              }
            });
      }
      return this.kievTime$;
    }
  }

  ngOnDestroy() {
    this.moscowSub.unsubscribe();
    this.kievSub.unsubscribe();
  }

}
