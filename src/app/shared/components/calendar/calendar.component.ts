import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public daysInMonth: number[];

  constructor() {
    this.daysInMonth = [];
  }

  ngOnInit(): void {
    const now = new Date()
    this.setCountDaysInMonth(now.getFullYear(), now.getMonth() + 1);
  }

  setCountDaysInMonth(year: number, month: number) {
    const countDaysInMonth = new Date(year, month, 0).getDate()
    this.daysInMonth = new Array(countDaysInMonth).fill(0).map((x,i)=>i+1);
  }

}
