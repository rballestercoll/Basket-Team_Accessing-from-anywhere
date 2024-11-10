import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../service/players.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterNamePipe } from '../../pipes/filter-name.pipe';
import { DetailComponent } from '../detail/detail.component';
import { CreatePlayerComponent } from '../create-player/create-player.component';

@Component({
  selector: 'app-players-component',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    FilterNamePipe,
    CreatePlayerComponent,
    DetailComponent,
  ],
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {
  players: any[] = [];
  filterSearch = '';
  opcion = 'Nombre';
  opcion2 = 'Todos';
  mensaje: string = '';

  // Variables para manejar modales y detalles
  modalOpenCrear = false;
  mostrarDetalle = false;
  playerSeleccionado: any;

  constructor(private playersService: PlayersService, private router: Router) {}

  ngOnInit(): void {
    this.playersService.getPlayers().subscribe({
      next: (data: any[]) => {
        this.players = data;
        console.log('Jugadores obtenidos:', this.players); // Agrega este console.log
      },
      error: (error: any) => {
        console.error('Error al obtener jugadores:', error);
      },
    });
  }

  // Método para abrir el modal de creación
  openModalCrear() {
    this.modalOpenCrear = true;
  }

  // Método para eliminar un jugador
  removePlayer(id: string) {
    this.playersService.deletePlayer(id)
      .then(() => {
        this.mensaje = 'El jugador ha sido eliminado exitosamente.';
        setTimeout(() => {
          this.mensaje = '';
        }, 2500);
      })
      .catch((error: any) => {
        console.error('Error al eliminar el jugador:', error);
      });
  }

  // Método para navegar al detalle del jugador
  verDetalle(id: string) {
    this.router.navigate(['/player', id]);
  }

  // Método para abrir el modal de edición (si aplica)
  editarJugador(player: any) {
    this.playerSeleccionado = player;
    this.mostrarDetalle = true;
  }

  // Método para cerrar el detalle
  cerrarDetalle() {
    this.mostrarDetalle = false;
    this.playerSeleccionado = null;
  }
}
