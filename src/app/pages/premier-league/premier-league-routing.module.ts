import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PremierLeagueComponent} from "./premier-league.component";

const routes: Routes = [
  {
    path: '',
    component: PremierLeagueComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremierLeagueRoutingModule {}
