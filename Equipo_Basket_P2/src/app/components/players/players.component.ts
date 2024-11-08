import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../service/players.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterNamePipe } from '../../pipes/filter-name.pipe';
import { DetailComponent } from '../detail/detail.component';
import { CreatePlayerComponent } from '../create-player/create-player.component';


@Component({
  selector: 'app-players-component',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, FilterNamePipe, CreatePlayerComponent, DetailComponent], // Elimina los imports no utilizados

  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: any = [];
  player: any;
  filterSearch = '';
  opcion = 'Nombre';
  opcion2 = 'Todos';
  rerender: any = true;
  playerId: any = null;
  mensaje: string = '';

  constructor(private PlayerService: PlayersService) {}

  modalOpenCrear = false;

  ngOnInit(): void {
    this.PlayerService.getPlayers().subscribe({
      next: (data: any[]) => {
        this.players = data;
      },
      error: (error) => {
        console.error('Error al obtener jugadores:', error);
      }
    });
  }

  getPlayers(): void {
    this.players = this.PlayerService.getPlayers();
  }

  setPlayer(id: String) {
    console.log("click");
    this.rerender = false;
    this.PlayerService.getPlayerById(id).subscribe(player => {
      this.player = player;
    });
    setTimeout(() => (this.rerender = true), 500);
  }

  removePlayer(id: String) {
    this.PlayerService.deletePlayer(id);
    this.mensaje = 'El jugador ha sido eliminado exitosamente.';
    setTimeout(() => {
      this.mensaje = '';
    }, 2500);
  }

  openModalCrear() {
    console.log("abrir modal");
    this.modalOpenCrear = true;
    const modal = document.querySelector('.modalCrear');
    if (modal) {
      modal.classList.add('d-block');
    }
  }
}
