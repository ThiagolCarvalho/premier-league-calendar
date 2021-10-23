import {Component, OnInit} from '@angular/core';
import {PremierLeagueWS} from "../../shared/ws/premier-league-ws";
import {IPremierLeague} from "../../shared/models/IPremierLeague";
import {IEvent} from "../../shared/models/IEvent";

@Component({
  selector: 'app-premier-league',
  templateUrl: './premier-league.component.html',
  styleUrls: ['./premier-league.component.css']
})
export class PremierLeagueComponent implements OnInit {

  public events: IEvent[] = []

  constructor(private premierLeagueWS: PremierLeagueWS) {
    this.premierLeagueWS.getAll().subscribe(premierLeague => {
      this.initEvents(premierLeague);
    })
  }

  ngOnInit(): void {
  }

  private initEvents(premierLeague: IPremierLeague): void {
    const events = [] as IEvent[];
    premierLeague.matches.forEach(match => {
      const event = {} as IEvent;
      event.title = `[${match.team1}] x [${match.team2}]`;
      event.date = match.date;
      events.push(event);
    });
    this.events = events;
  }

}
