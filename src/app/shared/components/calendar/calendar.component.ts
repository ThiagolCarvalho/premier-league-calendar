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
    this.setCalendar(date);
    this.setMonth(date);
  }

  private setCalendar(date: Date): void {
    const countDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    let monthBeforeDaysCount = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    let arrayMonthBefore = [] as string[];
    let arrayMonthAfter = [] as string[];

    for (let i = firstDayIndex; i > 0; i--) {
      arrayMonthBefore.push(monthBeforeDaysCount.toString());
      monthBeforeDaysCount--;
    }

    const days = new Array(countDaysInMonth).fill(null).map((x,i)=>this.checkLeftPad((i+1).toString()));

    arrayMonthBefore = arrayMonthBefore.reverse()

    const calendarDaysBefore = [] as ICalendarDay[]
    const calendarDaysAfter = [] as ICalendarDay[]

    let passedMonth = new Date(date);
    passedMonth.setMonth(passedMonth.getMonth() - 1);
    arrayMonthBefore.forEach(day => {
      const month = this.checkLeftPad((passedMonth.getMonth() + 1).toString());
      const matches = this.data.matches.filter(match => match.date === `${passedMonth.getFullYear()}-${month}-${day}`)
      calendarDaysBefore.push({day: day, matches: matches})
    })

    days.forEach(day => {
      const month = this.checkLeftPad((date.getMonth() + 1).toString());
      const matches = this.data.matches.filter(match => match.date === `${date.getFullYear()}-${month}-${day}`)
      this.calendarDays.push({day: day, matches: matches})
    })

    this.calendarDays = calendarDaysBefore.concat(this.calendarDays).concat(calendarDaysAfter);


    let startDay = 1;
    for (let i = this.calendarDays.length; i < 42; i++) {
      arrayMonthAfter.push(this.checkLeftPad(startDay.toString()));
      startDay++;
    }

    let nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    arrayMonthAfter.forEach(day => {
      const month = this.checkLeftPad((nextMonth.getMonth() + 1).toString());
      const formatedDate = `${nextMonth.getFullYear()}-${month}-${day}`
      const matches = this.data.matches.filter(match => match.date === formatedDate)
      calendarDaysAfter.push({day: day, matches: matches})
    })

    this.calendarDays = this.calendarDays.concat(calendarDaysAfter);
  }

  private calendarDayFactory(array: string[], selectedDate: Date): ICalendarDay[] {
    const calendarDayArray = [] as ICalendarDay[];
    array.forEach(day => {
      const month = this.checkLeftPad((selectedDate.getMonth() + 1).toString());
      const matches = this.data.matches.filter(match => match.date === `${selectedDate.getFullYear()}-${month}-${day}`)
      calendarDayArray.push({day: day, matches: matches})
    })
    return calendarDayArray;
  }

  private setMonth(date: Date): void {
    this.title = date.getFullYear() + ' - ' + date.toLocaleString('en', { month: 'long' });
  }

  checkLeftPad(text: string): string {
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

}
