import { Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { PlayersComponent } from './components/players/players.component';

export const routes: Routes = [
                                {path: '', component: PlayersComponent},
                                {path: 'player/:id', component: DetailComponent},
];
