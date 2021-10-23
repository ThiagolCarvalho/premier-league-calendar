import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PremierLeagueComponent} from "./premier-league.component";
import {PremierLeagueRoutingModule} from "./premier-league-routing.module";
import {PremierLeagueWS} from "../../shared/ws/premier-league-ws";
import {CalendarModule} from "../../shared/components/calendar/calendar.module";

@NgModule({
  declarations: [
    PremierLeagueComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule,
    PremierLeagueRoutingModule
  ],
  providers: [PremierLeagueWS]
})
export class PremierLeagueModule { }
