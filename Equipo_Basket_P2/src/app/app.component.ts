import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayersComponent } from './components/players/players.component';
import { FormsModule, NgModel } from '@angular/forms';
import { MediaComponent } from './components/media/media.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlayersComponent,FormsModule,MediaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'equipo-basket';
}
