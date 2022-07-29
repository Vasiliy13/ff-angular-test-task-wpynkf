import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

/**
 * Holds application state
 */
@Injectable({ providedIn: 'root' })
export class AppStorage {
    private _selectedCity: BehaviorSubject<City> = new BehaviorSubject<City>('Moscow');

    constructor() { }

    selectedCity$: Observable<City> = this._selectedCity.asObservable();

    changeSelectedCity(city: City): void {
        this._selectedCity.next(city);
    }
}

export type City = 'Moscow' | 'Kiev';
