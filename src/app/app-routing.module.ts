import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'premier-league', loadChildren: () => import('./pages/premier-league/premier-league.module').then(m => m.PremierLeagueModule) },
  { path: '**', redirectTo: '/premier-league'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
