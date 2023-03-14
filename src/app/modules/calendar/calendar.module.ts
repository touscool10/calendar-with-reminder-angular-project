import { EventService } from './event/event.service';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CalendarComponent } from './calendar/calendar.component';
import { CreateEventComponent } from './event/create-event/create-event.component';
import { MonthComponent } from './month/month.component';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CalendarService } from './calendar/calendar.service';
import { ListEventComponent } from './event/list-event/list-event.component';



@NgModule({
  declarations: [
    CalendarComponent,
    CreateEventComponent,
    MonthComponent,
    ListEventComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTooltipModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  providers: [
    CalendarService,
    EventService
  ]
})
export class CalendarModule { }
