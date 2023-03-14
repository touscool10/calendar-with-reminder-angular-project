import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Events } from '../event/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private updateSubject = new BehaviorSubject<Events[]>([]);

  private onMonthOrYearChange = new BehaviorSubject<{
    selectedMonth     : number,
    selectedYear      : number,
    selectedMonthName?: string
  }>({
      selectedMonth: new Date().getMonth(),
      selectedYear : new Date().getFullYear()
    });

  constructor() { }

  emitMonthOrYearChange(month: number, year: number, monthName?: string){

    this.onMonthOrYearChange.next({
      selectedMonth     : month,
      selectedYear      : year,
      selectedMonthName : monthName ? monthName : ''
    });

  }

  getMonthOrYearChange(){
     return this.onMonthOrYearChange.asObservable();
  }

  updateAllEvents(events: Events[]) {
      this.updateSubject.next(events);
  }

  getUpdateAllEvents() {
      return this.updateSubject.asObservable();
  }

}


