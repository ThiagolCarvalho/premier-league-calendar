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

  ngOnChanges() {
    this.loadCalendar(this.selectedDate);
  }

  private loadCalendar(date: Date) {
    this.calendarDays = [];
    this.setCalendar(date);
    this.setTitle(date);
  }

  private setCalendar(date: Date): void {
    const countDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    let monthBeforeDaysCount = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    let pastMonthDays = [] as string[];
    const currentMonthDays = new Array(countDaysInMonth).fill(null).map((x,i)=>this.checkLeftPad((i+1).toString()));
    let nextMonthDays = [] as string[];

    for (let i = firstDayIndex; i > 0; i--) {
      pastMonthDays.push(monthBeforeDaysCount.toString());
      monthBeforeDaysCount--;
    }

    pastMonthDays = pastMonthDays.reverse()

    let passedMonth = new Date(date);
    passedMonth.setMonth(passedMonth.getMonth() - 1);

    this.calendarDays = this.calendarDayFactory(pastMonthDays, passedMonth).concat(this.calendarDayFactory(currentMonthDays, date))

    let startDay = 1;
    for (let i = this.calendarDays.length; i < 42; i++) {
      nextMonthDays.push(this.checkLeftPad(startDay.toString()));
      startDay++;
    }

    let nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    this.calendarDays = this.calendarDays.concat(this.calendarDayFactory(nextMonthDays, nextMonth));
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
