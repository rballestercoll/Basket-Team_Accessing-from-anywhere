import { Component, Input, OnInit } from '@angular/core';
import { PlayersService } from '../../service/players.service';
import { CommonModule } from '@angular/common';
import { MediaComponent } from '../media/media.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-detail-component',
  standalone: true,
  imports: [MediaComponent, CommonModule, EditPlayerComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  @Input() player: any;
  modalOpen = false;



  constructor(private PlayersService: PlayersService) {}



  openModal(id: string) {
    this.PlayersService.getPlayerById(id).subscribe(player => {
      this.player = player;

      this.modalOpen = true; // Abre el modal
      const modal = document.querySelector('.modalEditar');
      if (modal){
        modal.classList.add('d-block');
      }
    });
  }


}
