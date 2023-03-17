import { Component, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Events } from '../interfaces';
import { MAT_MOMENT_DATE_FORMATS,  MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { AlertService } from 'src/app/shared/alert.service';
import * as moment from 'moment';
import { EventService } from '../event.service';
import { CalendarService } from '../../calendar/calendar.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class CreateEventComponent implements OnInit, OnDestroy {

  public editMode: boolean  = (!this.data.eventId) ? false : this.data.editMode as boolean;
  public events: Events[] = [];
  public filterDate!: Date;
  public maximumLengthReached: boolean = false;
  public defaultDateForDatePicker: Date = new Date();
  public createEventForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
                                      allEvents: Events[],
                                      selectedYear: number,
                                      selectedMonth: number
                                      editMode?: boolean,
                                      eventId?: number
                                    },
    public dialogRef: MatDialogRef<CreateEventComponent>,

    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public eventService: EventService,
    public calendarService: CalendarService,
    ) { }

    ngOnInit(): void {
      this.events = this.data.allEvents;
      this.init();
    }

    ngOnDestroy(): void {
    }

    init() {

      this.setDefaultDateForDatePicker();

      this.createEventForm = this.formBuilder.group({
        id: [''],
        date: [this.defaultDateForDatePicker, Validators.required],
        description: ['', [Validators.required, Validators.maxLength(30)]],
        hour: ['', Validators.required],
        color: ['', Validators.required]
      });

      if (this.data.eventId) {
        this.initializeEditMode();
      }
    }

    initializeEditMode() {
      this.editMode = true;
      let actualEvent = this.events.find(e => e.id === this.data?.eventId);

      this.createEventForm.patchValue({
        id:  actualEvent?.id?.toString() as string,
        description:  actualEvent?.description,
        date:  new Date(actualEvent?.date as Date),
        hour:  actualEvent?.hour,
        color:  actualEvent?.color,
      });
    }



    saveChanges() {

      if (this.createEventForm.valid) {

        this.filterDate = new Date(this.createEventForm.controls['date'].value as Date);

          let eventEdited: Events = {
            id: parseInt(this.createEventForm.controls['id'].value as string) ,
            description: this.createEventForm.controls['description'].value as string,
            date: this.filterDate ,
            hour: this.createEventForm.controls['hour'].value as string,
            color: this.createEventForm.controls['color'].value as string,

            day : this.filterDate?.getDate() ,
            month : this.filterDate?.getMonth(),
            weekday : this.filterDate?.getDay() ,
            year : this.filterDate?.getFullYear()
          };

          const searchEvent = this.events.find(e => e.id === this.data?.eventId);

          if(searchEvent){
            let index = this.events.indexOf(searchEvent);

            this.events[index] = eventEdited;

            this.alertService.success('Event Edited successfully!');

            this.closeDialog(this.events);

            this.calendarService.updateAllEvents(this.events);

          }else {
            this.alertService.error("Event not found", 3);
          }


      } else {
        this.alertService.warning('Fill all the fields poperly!');
      }
    }

    createEvent() {
      if (this.createEventForm.valid) {

          let event: Events = {
            description: this.createEventForm.controls['description'].value as string,
            date: this.createEventForm.controls['date'].value as Date,
            hour: this.createEventForm.controls['hour'].value as string,
            color: this.createEventForm.controls['color'].value as string
          };

          this.filterDate = new Date(this.createEventForm.controls['date'].value as Date);

          event.day = this.filterDate?.getDate() ;
          event.month = this.filterDate?.getMonth();
          event.weekday = this.filterDate?.getDay() ;
          event.year = this.filterDate?.getFullYear();

          const eventId = (this.events.length === 0) ? 1 : this.events.length + 1;
          event.id = eventId;

          this.events.push(event);

          if (this.events.length === event.id) {
            this.alertService.success('Event Created successfully!');
          }

          this.createEventForm.reset({
            id:  null,
            date:  null,
            description:  null,
            hour: null,
            color: '#000000'
          });

          this.closeDialog(this.events);
          //this.eventService.emitWhenEventsChange(this.events);

          this.calendarService.updateAllEvents(this.events);


      } else {
        this.alertService.warning('Fill all the fields properly!');
      }



    }

    deleteEvent(eventId: number | undefined){
      if (confirm("Are you sure you want to delete")) {

          const searchEvent = this.events.find(e => e.id === eventId);
          let index = -1 ;
          if (searchEvent) {
            index = this.events.indexOf(searchEvent);
          }

          if(index > -1) {

            this.events.splice(index, 1);

            this.alertService.success('Event Deleted successfully!');

            this.closeDialog(this.events);

            //this.eventService.emitWhenEventsChange(this.events);

            this.calendarService.updateAllEvents(this.events);

          }else {
            this.alertService.error("Event not found", 3);
          }


      }
    }

    closeDialog(event?: any){
      this.dialogRef.close(event);
    }

    setDefaultDateForDatePicker(){
      let today = new Date().getDate();
      this.defaultDateForDatePicker = new Date(this.data.selectedYear, this.data.selectedMonth, today);

      return this.defaultDateForDatePicker;
    }

    getMaximumLength(description: string){
      this.maximumLengthReached = false;
      if (description.length > 30) {
        this.maximumLengthReached = true;
      }
    }

}

