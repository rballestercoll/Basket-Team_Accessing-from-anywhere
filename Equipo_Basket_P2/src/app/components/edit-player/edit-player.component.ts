import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlayersService } from '../../service/players.service';
import { FileUploadService } from '../../service/file-upload.service';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Asegúrate de incluir ReactiveFormsModule
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css'],
})
export class EditPlayerComponent implements OnChanges {
  @Input() player: any; // Jugador que se va a editar
  @Output() cerrarModal = new EventEmitter<void>();

  editForm!: FormGroup;
  mensaje: string = '';
  errorField: 'img' | 'video' | null = null; // Campo en error
  isLoading: boolean = false;

  positions = ['Ala-Pivot', 'Alero', 'Base', 'Escolta', 'Pivot'];

  selectedFiles: { img: File | null; video: File | null } = { img: null, video: null };

  constructor(
    private formBuilder: FormBuilder,
    private playersService: PlayersService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['player'] && this.player) {
      this.initializeForm();
    }
  }

  initializeForm(): void {
    this.editForm = this.formBuilder.group({
      name: [this.player?.name || '', [Validators.required, Validators.minLength(2)]],
      num: [this.player?.num || '', Validators.required],
      position: [this.player?.position || '', Validators.required],
      age: [this.player?.age || '', [Validators.required, Validators.min(18), Validators.max(50)]],
      anillos: [this.player?.anillos || '', Validators.required],
      description: [this.player?.description || '', [Validators.required, Validators.minLength(30)]],
      img: [this.player?.img || null],
      video: [this.player?.video || null],
    });
  }

  async onFileSelected(event: any, type: 'img' | 'video') {
    const file = event.target.files[0];
    if (!file) return;

    try {
      await this.fileUploadService.validateFile(file);
      if (type === 'img') {
        this.selectedFiles.img = file;
      } else if (type === 'video') {
        this.selectedFiles.video = file;
      }
      this.mensaje = ''; // Limpiar mensajes de error
      this.errorField = null;
    } catch (error) {
      this.mensaje = error as string; // Mostrar mensaje de error
      this.errorField = type; // Asociar error al campo
      if (type === 'img') {
        this.selectedFiles.img = null; // Limpiar archivo seleccionado
      } else if (type === 'video') {
        this.selectedFiles.video = null; // Limpiar archivo seleccionado
      }
      (event.target as HTMLInputElement).value = ''; // Reiniciar el campo de archivo
    }
  }

  async guardarCambios() {
    this.isLoading = true;
    try {
      const updatedData = this.editForm.value;

      // Subir nueva imagen si se selecciona
      if (this.selectedFiles.img) {
        const imgPath = `players/images/${this.selectedFiles.img.name}`;
        updatedData.img = await this.fileUploadService.uploadFile(this.selectedFiles.img, imgPath);
      } else {
        updatedData.img = this.player.img; // Mantener la imagen actual
      }

      // Subir nuevo video si se selecciona
      if (this.selectedFiles.video) {
        const videoPath = `players/videos/${this.selectedFiles.video.name}`;
        updatedData.video = await this.fileUploadService.uploadFile(this.selectedFiles.video, videoPath);
      } else {
        updatedData.video = this.player.video; // Mantener el video actual
      }

      // Actualizar jugador
      await this.playersService.updatePlayer(this.player.id, updatedData);

      this.mensaje = 'El jugador ha sido actualizado exitosamente.';
      this.errorField = null; // Limpiar campo en error
      setTimeout(() => {
        this.cerrarModalEditar();
      }, 2500);
    } catch (error) {
      console.error('Error al actualizar el jugador:', error);
      this.mensaje = 'Error al actualizar el jugador. Intente de nuevo.';
    } finally {
      this.isLoading = false;
    }
  }

  cerrarModalEditar() {
    this.mensaje = ''; // Limpiar mensajes
    this.errorField = null; // Limpiar campo en error
    this.selectedFiles = { img: null, video: null }; // Limpiar archivos seleccionados
    this.cerrarModal.emit();
  }
}
