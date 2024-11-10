import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayersService } from '../../service/players.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent {
  @Input() player: any;
  @Output() cerrarModal = new EventEmitter<void>();
  mensaje: string = '';

  positions = ['Ala-Pivot', 'Alero', 'Base', 'Escolta', 'Pivot'];

  constructor(private PlayersService: PlayersService) {}

  guardarCambios() {
    this.PlayersService.updatePlayer(this.player.id, this.player)
      .then(() => {
        this.mensaje = 'El jugador ha sido actualizado exitosamente.';

        // Cierra el modal y el mensaje después de 2.5 segundos
        setTimeout(() => {
          this.mensaje = '';
          this.cerrarModalEditar();
        }, 2500);
      })
      .catch((error) => {
        console.error('Error al actualizar el jugador en la base de datos:', error);
      });
  }

  cerrarModalEditar() {
    this.cerrarModal.emit();
  }
}
