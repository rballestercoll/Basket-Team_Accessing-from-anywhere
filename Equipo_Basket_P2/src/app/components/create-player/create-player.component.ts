import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayersService } from '../../service/players.service';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, AbstractControl, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService } from '../../service/file-upload.service';

@Component({
  selector: 'app-create-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css'],
})
export class CreatePlayerComponent implements OnInit {
  @Output() cerrarModal = new EventEmitter<void>();

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    num: new FormControl(''),
    position: new FormControl(''),
    age: new FormControl(''),
    anillos: new FormControl(''),
    description: new FormControl(''),
    img: new FormControl(''),
    video: new FormControl(''),
  });
  submitted = false;
  mensaje: string = '';

  positions = ['Ala-Pivot', 'Alero', 'Base', 'Escolta', 'Pivot'];

  // Variables para almacenar archivos seleccionados
  selectedFiles: { img: File | null; video: File | null } = { img: null, video: null };

  constructor(
    private formBuilder: FormBuilder,
    private playerService: PlayersService,
    private fileUploadService: FileUploadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      num: ['', [Validators.required]],
      position: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(50)]],
      anillos: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      img: [''], // No se valida porque se obtiene desde el servicio de subida
      video: [''], // Igual que la imagen
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // Método para manejar archivos seleccionados
  onFileSelected(event: any, type: 'img' | 'video') {
    const file = event.target.files[0];
    if (type === 'img') {
      this.selectedFiles.img = file;
    } else if (type === 'video') {
      this.selectedFiles.video = file;
    }
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const playerData = { ...this.form.value };

    try {
      // Subir imagen si se selecciona
      if (this.selectedFiles.img) {
        const imgPath = `players/images/${this.selectedFiles.img.name}`;
        playerData.img = await this.fileUploadService.uploadFile(this.selectedFiles.img, imgPath);
      }

      // Subir video si se selecciona
      if (this.selectedFiles.video) {
        const videoPath = `players/videos/${this.selectedFiles.video.name}`;
        playerData.video = await this.fileUploadService.uploadFile(this.selectedFiles.video, videoPath);
      }

      // Guardar jugador en Firestore
      await this.playerService.addPlayer(playerData);

      this.mensaje = 'El jugador ha sido creado exitosamente.';
      setTimeout(() => {
        this.cerrarModalCrear();
      }, 2500);
    } catch (error) {
      console.error('Error al crear el jugador:', error);
    }

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  cerrarModalCrear() {
    this.form.reset();
    this.cerrarModal.emit();
  }
}
