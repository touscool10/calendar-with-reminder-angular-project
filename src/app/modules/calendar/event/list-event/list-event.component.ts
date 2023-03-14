import { Component, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Events } from '../interfaces';

import { AlertService } from 'src/app/shared/alert.service';
import { MonthDays } from '../../month/interfaces';
import { CalendarService } from '../../calendar/calendar.service';
import { CreateEventComponent } from '../create-event/create-event.component';


@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss']
})
export class ListEventComponent implements OnInit, OnDestroy {

  public allEvents: Events[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public day: MonthDays,
    public dialogRef: MatDialogRef<ListEventComponent>,
    private dialog: MatDialog,
    private calendarService: CalendarService
    ) { }

    ngOnInit(): void {

      this.calendarService
        .getUpdateAllEvents()
        .subscribe(eventsArray => {
          this.refreshAllEvents(eventsArray);
          this.refreshDayEvents();
      });
    }

    ngOnDestroy(): void {
    }

    openEditEventDialog(eventId: number | undefined) {
      const config = new MatDialogConfig();

      config.disableClose = true;
      config.autoFocus = true;
      config.panelClass = "modal-panel";

      config.data =  { allEvents: this.allEvents, editMode: true, eventId: eventId };

      const dialogRef = this.dialog.open(CreateEventComponent, config);

      dialogRef.afterClosed().subscribe(result => {

          if (result) {
            this.allEvents = result;
            this.calendarService.updateAllEvents(this.allEvents);
          }
      });
    }

    closeDialog(){
      this.dialogRef.close();
    }

    refreshAllEvents(value : Events[]){
      this.allEvents = value;
    }

    refreshDayEvents(){

      this.day = this.day;
      this.day.events = this.getDaysEvents(this.day.date as number, this.day.month, this.day.year);

    }

    getDaysEvents(date: number, month: number, year: number){

      let events: Events[] = [];
        if(this.allEvents.length > 0){
          this.allEvents.forEach((event) => {
            if(event.day === date && event.month === month  && event.year === year ){
              events.push(event);
            }
          });
        }

        return this.orderEvents(events);

    }

    private orderEvents(events: Events[]){
      let eventsAux: Events[] = [];


      events.forEach((event) => {
        let hourFormated = this.formatEventHour(event);
        event.hourFormated = hourFormated;
        eventsAux.push(event);
      });

      eventsAux.sort(function(a, b){
        return (a.hourFormated as number) - (b.hourFormated as number)
      });

      return eventsAux;

    }

    private formatEventHour(event: Events){

      let hour:any = event.hour.split(':');
      hour = hour[0] + hour[1];
      hour = parseInt(hour);

      return hour;
    }
}


