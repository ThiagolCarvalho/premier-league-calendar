import {IEvent} from "./IEvent";

export interface ICalendarDay {
  day: string;
  month: string;
  year: string;
  events: IEvent[];
}
