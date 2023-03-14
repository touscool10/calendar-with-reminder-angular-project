import { EventEmitter, Injectable } from '@angular/core';
import { Events } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  //whenEventsChange: EventEmitter<Events[]> = new EventEmitter();

  constructor() { }

  /*emitWhenEventsChange(allEvents: Events[]){
    this.whenEventsChange.emit(allEvents);
  }

  getWhenEventsChange(){
    return this.whenEventsChange;
  } */
}
