import {IEvent} from "./IEvent";

export interface ICalendarDay {
  day: string;
  month: string;
  events: IEvent[];
}
