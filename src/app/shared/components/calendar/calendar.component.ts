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
  public daysOfTheWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  public startDay: string = 'first-day';
  public calendarDays: ICalendarDay[] = []

  constructor() {
  }

  ngOnChanges() {
    this.calendarDays = [];
    this.loadCalendar();
  }

  private loadCalendar() {
    const now = new Date(2019, 11, 22)
    this.setDaysInMonth(now.getFullYear(), now.getMonth() + 1);
    this.setCalendar(now);
    this.setMonth(now);
    this.setStartDay(now);
  }

  private setCalendar(date: Date) {
    const countDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const days = new Array(countDaysInMonth).fill(0).map((x,i)=>(i+1).toString());
    days.forEach(day => {
      if (+day < 10) {
        day = '0' + day;
      }
      const matches = this.data.matches.filter(match => match.date === `${date.getFullYear()}-${date.getMonth()+1}-${day}`)
      this.calendarDays.push({day: day, matches: matches})
    })
    console.log(this.calendarDays);
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

}
