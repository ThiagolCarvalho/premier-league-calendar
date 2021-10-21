import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() data: any;

  public daysInMonth: number[];
  public monthName: string;
  public daysOfTheWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  constructor() {
    this.daysInMonth = [];
    this.monthName = '';
  }

  ngOnInit(): void {
    const now = new Date()
    this.setDaysInMonth(now.getFullYear(), now.getMonth() + 1);
    this.setMonth(now);
  }

  ngOnChanges() {
    console.log(this.data);
  }

  setDaysInMonth(year: number, month: number) {
    const countDaysInMonth = new Date(year, month, 0).getDate()
    this.daysInMonth = new Array(countDaysInMonth).fill(0).map((x,i)=>i+1);
    console.log(this.daysInMonth);
  }

  setMonth(date: Date) {
    this.monthName = date.toLocaleString('en', { month: 'long' });
  }

}
