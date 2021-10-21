import {Component, OnInit} from '@angular/core';
import {PremierLeagueWS} from "../../shared/ws/premier-league-ws";
import {IPremierLeague} from "../../shared/models/IPremierLeague";

@Component({
  selector: 'app-premier-league',
  templateUrl: './premier-league.component.html',
  styleUrls: ['./premier-league.component.css']
})
export class PremierLeagueComponent implements OnInit {

  public premierLeague: IPremierLeague = {name: '', matches: []}

  constructor(private premierLeagueWS: PremierLeagueWS) {
    this.premierLeagueWS.getAll().subscribe(premierLeague => {
      this.premierLeague = premierLeague;
    })
  }

  ngOnInit(): void {
  }

}
