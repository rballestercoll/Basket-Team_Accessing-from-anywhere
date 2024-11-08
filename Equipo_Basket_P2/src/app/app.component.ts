import { Component, NgModule, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { PlayersComponent } from "./components/players/players.component";
import { FormsModule, NgModel } from '@angular/forms';
import { MediaComponent } from './components/media/media.component';
import { CreatePlayerComponent } from './components/create-player/create-player.component';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, PlayersComponent,FormsModule,MediaComponent],


})
export class AppComponent {
  title = 'equipo-basket';
  modalOpen = false;

  openModal() {


      this.modalOpen = true; // Abre el modal
      const modal = document.querySelector('.modal');
      if (modal){
        modal.classList.add('d-block');
      }
    };



}
