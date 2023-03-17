import { CalendarService } from './calendar.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateEventComponent } from '../event/create-event/create-event.component';
import { Events } from '../event/interfaces';
import { Month } from '../month/interfaces';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public  months: Month[] = [
    { name: 'January',    id: 0 , abbreviation: 'Jan'  },
    { name: 'February',   id: 1 , abbreviation: 'Fev'  },
    { name: 'March',      id: 2 , abbreviation: 'Mar'  },
    { name: 'April',      id: 3 , abbreviation: 'Apr'  },
    { name: 'May',        id: 4 , abbreviation: 'May'  },
    { name: 'June',       id: 5 , abbreviation: 'Jun'  },
    { name: 'July',       id: 6 , abbreviation: 'Jul'  },
    { name: 'August',     id: 7 , abbreviation: 'Aug'  },
    { name: 'September',  id: 8 , abbreviation: 'Sep'  },
    { name: 'October',    id: 9 , abbreviation: 'Oct'  },
    { name: 'November',   id: 10, abbreviation: 'Nov'  },
    { name: 'December',   id: 11, abbreviation: 'Dec'  }
  ];

  public userEvents: Events[] = [];
  public editMode: boolean = false;
  public years: number[] = [];

  public selectedYear!: number;
  public selectedMonth!: number;
  public selectedMonthName: string = '';

  constructor(
    private dialog: MatDialog,
    private calendarService: CalendarService,
    private responsive: BreakpointObserver) {

  }

  ngOnInit(): void {
    this.generateYears();
  }

  generateYears(){
    const startYear: number = 1923;
    const endYear: number = 2123;
    for (let i = startYear; i <= endYear; i++) {
      this.years.push(i);
    }

    this.selectedYear = new Date().getFullYear();
    this.selectedMonth = new Date().getMonth();
    this.selectedMonthName = this.getMonthName(this.selectedMonth);
  }

  openCreateEventDialog(){

    const config = new MatDialogConfig();

    config.disableClose = true;
    config.autoFocus = true;
    config.panelClass = "modal-panel";

    config.data = {
      allEvents: this.userEvents,
      editMode: false,
      eventId: null,
      selectedMonth: this.selectedMonth,
      selectedYear: this.selectedYear
    };

    const dialogRef = this.dialog.open(CreateEventComponent, config);

    /*{
      minWidth: '500px',
      data:  { eventId: null, allEvents: this.userEvents, editMode: false },
      maxHeight: '500px',
    }*/

    dialogRef.afterClosed().subscribe(result => {

        if (result) {
            this.userEvents = result;
        }
    });
  }

  openEditEventDialog(eventId: number) {

    const config = new MatDialogConfig();

    config.disableClose = true;
    config.autoFocus = true;
    config.panelClass = "modal-panel";

    config.data =  { allEvents: this.userEvents, editMode: true, eventId: eventId };

    const dialogRef = this.dialog.open(CreateEventComponent, config);

      /*minWidth: '500px',
      data:  { eventId, allEvents: this.userEvents, editMode: true },
      maxHeight: '500px',*/

    dialogRef.afterClosed().subscribe(result => {

        if (result) {
          this.userEvents = result;
        }
    });
  }

  reloadAllEvents(events: Events[]){
    this.userEvents = events;
  }

  computeMonthAndYear(month?: number | null, year?: number | null, goToToday?: boolean) {

    if(month){
      this.selectedMonth = this.selectedMonth + month;
    }
    if(year){
      this.selectedYear = year;
    }


    if (this.selectedMonth > 11) {
      this.selectedMonth = 0;
      this.selectedYear = this.selectedYear + 1;
    }
    if (this.selectedMonth < 0) {
      this.selectedMonth = 11;
      this.selectedYear = this.selectedYear - 1;
    }

    if (goToToday) {
      this.selectedMonth = new Date().getMonth();
      this.selectedYear = new Date().getFullYear();
    }

    this.getMonthName(this.selectedMonth);

    this.calendarService.emitMonthOrYearChange(
      this.selectedMonth,
      this.selectedYear,
      this.selectedMonthName
    );
  }

  getMonthName(monthId: number) {
    const month  = this.months.find(x => x.id === monthId) ;

    this.selectedMonthName = month?.name as string ;

    return this.selectedMonthName ;
  }

}
