import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LayoutService } from 'src/app/shared/layout.service';
import { CalendarService } from '../calendar/calendar.service';
import { CreateEventComponent } from '../event/create-event/create-event.component';
import { Events } from '../event/interfaces';
import { ListEventComponent } from '../event/list-event/list-event.component';
import { Day, MonthDays } from './interfaces';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  public allEvents: Events[] = [];
  public selectedMonth!: number;
  public selectedYear!: number;

  public days: Day[] = [
    { name: 'Sunday',     id: 0, abbreviation: 'Sun' },
    { name: 'Monday',     id: 1, abbreviation: 'Mon' },
    { name: 'Tuesday',    id: 2, abbreviation: 'Tue' },
    { name: 'Wednesday',  id: 3, abbreviation: 'Wed' },
    { name: 'Thursday',   id: 4, abbreviation: 'Thu' },
    { name: 'Friday',     id: 5, abbreviation: 'Fri' },
    { name: 'Saturday',   id: 6, abbreviation: 'Sat' }
  ]


  public years: number[] = [];
  public dateIsToday: boolean = false;
  public selectedDate: number = 1;
  public totalMonthDays: number = 0;
  public firstDayOfMonth: number = 0;
  public monthDaysArray: MonthDays[] = [];
  public monthWeeksGroups: any[] = [];

  public emptyDays: number = 0;

  constructor(
    private calendarService: CalendarService,
    private dialog: MatDialog,
    public layoutService: LayoutService,
  ) {

  }


  ngOnInit(): void {

    this.calendarService
          .getUpdateAllEvents()
          .subscribe(eventsArray => {
            this.refreshAllEvents(eventsArray);
            this.init();
    });

  }

  init() {

      this.calendarService.getMonthOrYearChange()
      .subscribe(result => {
        this.refreshYearAndMonth(result);
        this.getTotalMonthDays();
        this.getfirstDayOfMonth();
        this.generateMonthDays();
      });
  }


  getTotalMonthDays(){
    this.totalMonthDays = new Date( this.selectedYear, this.selectedMonth + 1 , 0 ).getDate();
  }

  getfirstDayOfMonth(){
    this.firstDayOfMonth = new Date( this.selectedYear, this.selectedMonth, 1 ).getDay();
  }

  generateMonthDays(){
    this.monthDaysArray = [];
    const firstDay: number = 1;
    const lastDay: number = this.totalMonthDays;

    for (let i = firstDay; i <= lastDay; i++) {
      let day: MonthDays = {
        date: i,
        month: this.selectedMonth,
        year: this.selectedYear,
        events: this.getDaysEvents(i, this.selectedMonth, this.selectedYear)
      }
      this.monthDaysArray.push(day);
    }
    this.computeEmptyDays(this.selectedMonth, this.selectedYear);
    this.populateMonth();
  }

  private computeEmptyDays(month: number, year: number){
    let monthFirstDay = new Date(year, month, 1).getDay();
    this.emptyDays =  monthFirstDay;
  }

  populateMonth(){
    let monthWeeks: MonthDays[] = [];
    for(let i = 0; i < this.emptyDays; i++){
      monthWeeks.push(
        {
          date: null,
          month: this.selectedMonth,
          year: this.selectedYear,
          events: []
        }
      );
    }

    this.monthDaysArray = [...monthWeeks, ...this.monthDaysArray];

  }

  getSelectedYear(year: number){
    this.selectedYear = year;
    this.getSelectedMonth(this.selectedMonth);
  }

  getSelectedMonth(month: number){
    this.selectedMonth = month;
    this.getTotalMonthDays();
    this.getfirstDayOfMonth();
    this.generateMonthDays();
  }

  getTodayWeekDay(){
    return new  Date().getDay();
  }

  isToday(date: MonthDays){
    this.dateIsToday = false;

    let today = new Date();
    let todayDate = today.getDate();
    let todayMonth =  today.getMonth();
    let todayYear =  today.getFullYear();

    if(date.date === todayDate && date.month === todayMonth && date.year === todayYear){
      this.dateIsToday = true;
    }

    return this.dateIsToday;

  };

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

  refreshYearAndMonth(value : { selectedMonth: number, selectedYear: number, selectedMonthName?: string }){
    this.selectedMonth = value.selectedMonth;
    this.selectedYear = value.selectedYear;
  }

  refreshAllEvents(value : Events[]){
    this.allEvents = value;
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
        }
    });
  }

  openListEventsDialog(day: MonthDays) {

    const config = new MatDialogConfig();

    config.disableClose = false;
    config.autoFocus = true;
    config.panelClass = "modal-panel";

    config.data =  day;

    const dialogRef = this.dialog.open(ListEventComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  selectedMonthIsActual(){
    let result = false;
    if(this.selectedMonth === new Date().getMonth()){

      result = true;
    }

    return result;
  }


}
