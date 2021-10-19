import {IScore} from './IScore';

export interface IMatch {
  round: string;
  date: string;
  team1: string;
  team2: string;
  score: IScore[]
}
