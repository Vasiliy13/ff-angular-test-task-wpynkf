import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {City} from "./storage/app-storage";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class CurrentTimeService {

    constructor(private http: HttpClient) { }

    /**
     * Should emit current time in Moscow every second
     */
    public currentTimeMoscow$: Observable<Date | null> = this._getCurrentUnixTime('Moscow');

    /**
     * Should emit current time in Kiev every 2 second
     */
    public currentTimeKiev$: Observable<Date | null> = this._getCurrentUnixTime('Kiev');

    // loads time from server
    private _getCurrentUnixTime(city: City): Observable<Date> {
        return this.http.get<{datetime: string}>('https://worldtimeapi.org/api/timezone/Europe/' + city).pipe(
          map(resp => new Date(resp.datetime.substring(0, 19)))
        );
    }

    
    private _addSeconds(date: Date, seconds: number): Date {
        return new Date(date.getTime() + seconds * 1000);
    }
}


