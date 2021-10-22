import {Component, Input, OnChanges} from '@angular/core';
import {ICalendarDay} from "../../models/ICalendar";
import {IEvent} from "../../models/IEvent";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnChanges {
  @Input() events: IEvent[] = [];

  public title: string = '';
  public daysOfTheWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  public calendarDays: ICalendarDay[] = []
  public selectedDate: Date = new Date(2019, 7);

  constructor() {
    this.loadCalendar(this.selectedDate);
  }

  ngOnChanges(): void {
    this.loadCalendar(this.selectedDate);
  }

  private loadCalendar(date: Date): void {
    this.calendarDays = [];
    this.setCalendar(date);
    this.setTitle(date);
  }

  private setCalendar(date: Date): void {
    this.calendarDays = this.initCalendar(date);
  }

  private initCalendar(date: Date): ICalendarDay[] {
    const pastMonthDaysArray = this.pastMonthArray(date);
    const pastMonth = this.createDate(date, -1);
    const currentMonthDaysArray = this.currentMonthArray(date);

    const pastMonthCalendarArray = this.calendarDayFactory(pastMonthDaysArray, pastMonth);
    const currentMonthCalendarArray = this.calendarDayFactory(currentMonthDaysArray, date);
    const pastAndCurrentMonthCalendarArray = pastMonthCalendarArray.concat(currentMonthCalendarArray);

    const nextMonthDaysArray = this.nextMonthArray(pastAndCurrentMonthCalendarArray);
    let nextMonth = this.createDate(date, +1);

    const nextMonthCalendarArray = this.calendarDayFactory(nextMonthDaysArray, nextMonth);
    return pastAndCurrentMonthCalendarArray.concat(nextMonthCalendarArray);
  }

  private createDate(date: Date, index: number): Date {
    const month  = new Date(date);
    month.setMonth(month.getMonth() + index);
    return month;
  }

  private pastMonthArray(date: Date): string[] {
    let pastMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const pastMonthDaysArray = [] as string[];
    for (let i = firstDayIndex; i > 0; i--) {
      pastMonthDaysArray.push(pastMonthDays.toString());
      pastMonthDays--;
    }
    return pastMonthDaysArray.reverse();
  }

  private currentMonthArray(date: Date): string[] {
    const currentMonthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    return new Array(currentMonthDays).fill(null).map((x,i)=>this.checkLeftPad((i+1).toString()));
  }

  private nextMonthArray(calendarArray: ICalendarDay[]): string[] {
    let startDay = 1;
    const nextMonthDaysArray = [] as string[];
    for (let i = calendarArray.length; i < 42; i++) {
      nextMonthDaysArray.push(this.checkLeftPad(startDay.toString()));
      startDay++;
    }
    return nextMonthDaysArray;
  }

  private calendarDayFactory(array: string[], selectedDate: Date): ICalendarDay[] {
    const calendarDayArray = [] as ICalendarDay[];
    array.forEach(day => {
      const month = this.checkLeftPad((selectedDate.getMonth() + 1).toString());
      const events = this.events.filter(event => event.date === `${selectedDate.getFullYear()}-${month}-${day}`)
      calendarDayArray.push({day: day, month: selectedDate.getMonth().toString(), events: events})
    })
    return calendarDayArray;
  }

  private setTitle(date: Date): void {
    this.title = date.getFullYear() + ' - ' + date.toLocaleString('en', { month: 'long' });
  }

  private checkLeftPad(text: string): string {
    if (+text < 10) {
      return '0' + text;
    } else {
      return text;
    }
  }

  public previousMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1)
    this.loadCalendar(this.selectedDate);
  }

  public nextMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1)
    this.loadCalendar(this.selectedDate);
  }

  public getMonthClass(calendarDay: ICalendarDay): string {
    return calendarDay.month != this.selectedDate.getMonth().toString() ? 'other-month' : 'present-month'
  }

}
