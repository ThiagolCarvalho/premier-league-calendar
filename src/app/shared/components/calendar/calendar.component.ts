import {Component, Input, OnChanges} from '@angular/core';
import {IPremierLeague} from "../../models/IPremierLeague";
import {ICalendarDay} from "../../models/ICalendar";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnChanges {
  @Input() data: IPremierLeague = {name: '', matches: []};

  public daysInMonth: number[] = [];
  public title: string = '';
  public daysOfTheWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  public startDay: string = 'first-day';
  public calendarDays: ICalendarDay[] = []
  public selectedDate: Date = new Date(2019, 7);

  constructor() {
    this.loadCalendar(this.selectedDate);
  }

  ngOnChanges() {
    this.loadCalendar(this.selectedDate);
  }

  private loadCalendar(date: Date) {
    this.calendarDays = [];
    this.setDaysInMonth(date.getFullYear(), date.getMonth() + 1);
    this.setCalendar(date);
    this.setMonth(date);
    this.setStartDay(date);
  }

  private setCalendar(date: Date) {
    const countDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const days = new Array(countDaysInMonth).fill(0).map((x,i)=>(i+1).toString());
    days.forEach(day => {
      if (+day < 10) {
        day = '0' + day;
      }

      let month = (date.getMonth()+1).toString();

      if (+month < 10) {
        month = '0' + month;
      }

      const matches = this.data.matches.filter(match => match.date === `${date.getFullYear()}-${month}-${day}`)
      this.calendarDays.push({day: day, matches: matches})
    })
  }

  private setDaysInMonth(year: number, month: number) {
    const countDaysInMonth = new Date(year, month, 0).getDate()
    this.daysInMonth = new Array(countDaysInMonth).fill(0).map((x,i)=>i+1);
  }

  private setMonth(date: Date) {
    this.title = date.getFullYear() + ' - ' + date.toLocaleString('en', { month: 'long' });
  }

  private setStartDay(date: Date) {
    const dayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    switch (dayIndex) {
      case 0: {
        this.startDay = 'first-day';
        break;
      }
      case 1: {
        this.startDay = 'second-day';
        break;
      }
      case 2: {
        this.startDay = 'third-day';
        break;
      }
      case 3: {
        this.startDay = 'fourth-day';
        break;
      }
      case 4: {
        this.startDay = 'fifth-day';
        break;
      }
      case 5: {
        this.startDay = 'sixth-day';
        break;
      }
      case 6: {
        this.startDay = 'seventh-day';
        break;
      }
      default: {
        this.startDay = 'first-day';
        break;
      }
    }
  }

  public previousMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1)
    this.loadCalendar(this.selectedDate);
  }

  public nextMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1)
    this.loadCalendar(this.selectedDate);
  }

}
