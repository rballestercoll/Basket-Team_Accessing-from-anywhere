import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayersService } from '../../service/players.service';
import { FileUploadService } from '../../service/file-upload.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css'],
})
export class EditPlayerComponent {
  @Input() player: any; // Jugador que se va a editar
  @Output() cerrarModal = new EventEmitter<void>();
  mensaje: string = '';

  positions = ['Ala-Pivot', 'Alero', 'Base', 'Escolta', 'Pivot'];

  // Variables para manejar archivos seleccionados
  selectedFiles: { img: File | null; video: File | null } = { img: null, video: null };

  constructor(
    private playersService: PlayersService,
    private fileUploadService: FileUploadService
  ) {}

  // Manejo de selección de archivos
  onFileSelected(event: any, type: 'img' | 'video') {
    const file = event.target.files[0];
    if (type === 'img') {
      this.selectedFiles.img = file;
    } else if (type === 'video') {
      this.selectedFiles.video = file;
    }
  }

  async guardarCambios() {
    try {
      // Subir nueva imagen si se selecciona
      if (this.selectedFiles.img) {
        const imgPath = `players/images/${this.selectedFiles.img.name}`;
        this.player.img = await this.fileUploadService.uploadFile(this.selectedFiles.img, imgPath);
      }

      // Subir nuevo video si se selecciona
      if (this.selectedFiles.video) {
        const videoPath = `players/videos/${this.selectedFiles.video.name}`;
        this.player.video = await this.fileUploadService.uploadFile(this.selectedFiles.video, videoPath);
      }

      // Actualizar el jugador en Firestore
      await this.playersService.updatePlayer(this.player.id, this.player);

      this.mensaje = 'El jugador ha sido actualizado exitosamente.';
      setTimeout(() => {
        this.cerrarModalEditar();
      }, 2500);
    } catch (error) {
      console.error('Error al actualizar el jugador:', error);
    }
  }

  cerrarModalEditar() {
    this.cerrarModal.emit();
  }
}
