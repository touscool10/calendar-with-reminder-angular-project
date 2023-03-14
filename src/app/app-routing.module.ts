import { CalendarComponent } from './modules/calendar/calendar/calendar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthComponent } from './modules/calendar/month/month.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'month', component: MonthComponent },
  //{ path: '',   redirectTo: '/calendar', pathMatch: 'full' }, // redirect to `CalendarComponent`


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
