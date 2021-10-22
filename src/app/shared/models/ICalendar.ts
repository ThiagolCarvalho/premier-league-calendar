import {IMatch} from "./IMatch";

export interface ICalendarDay {
  day: string;
  month: string;
  matches: IMatch[];
}
