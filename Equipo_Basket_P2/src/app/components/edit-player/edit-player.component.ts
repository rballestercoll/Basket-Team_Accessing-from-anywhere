
import { Component, Input, OnInit } from '@angular/core';
import { PlayersComponent } from '../players/players.component';
import { DetailComponent } from '../detail/detail.component';
import { CommonModule } from '@angular/common';
import { Player } from '../../model/players';
import { ReactiveFormsModule, AbstractControl, FormControl, FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms'; // Elimina NgModel y FormsModule
import { PlayersService } from '../../service/players.service';
import { ActivatedRoute } from '@angular/router';
import { Storage, getDownloadURL, list, listAll, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [PlayersComponent, DetailComponent, CommonModule, FormsModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.css'
})

export class EditPlayerComponent{
  @Input() player: any;
  nuevoVideoSeleccionado = false;
  nuevaFotoSeleccionada = false;
  mensaje: string = '';


  constructor(private route: ActivatedRoute, private PlayersService: PlayersService, private storage: Storage,) { }

  positions = [ 'Ala-Pivot', 'Alero', 'Base', 'Escolta', 'Pivot'];





  cerrarModalEditar() {

    const modal = document.querySelector('.modalEditar');
    if (modal) {
      modal.classList.remove('d-block');

    }
  }


  guardarCambios() {
    this.PlayersService.edit(this.player.id, this.player).then(() => {
      this.mensaje = 'El jugador ha sido actualizado exitosamente.';

    // Cierra el modal y el mensaje después de 3 segundos
    setTimeout(() => {
      this.mensaje = '';

      // Código para cerrar el modal aquí
      this.cerrarModalEditar();
    }, 2500);
      // Puedes agregar aquí cualquier otra lógica después de actualizar el jugador
    }).catch((error) => {
      console.error('Error al actualizar el jugador en la base de datos:', error);
    });
  }

  async cambiarFoto(event: any) {
    const file = event.target.files[0];
    const imgRef = ref(this.storage, 'images/' + file.name);
    this.nuevaFotoSeleccionada = true;



    try {
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      this.player.img = url;
    } catch (error) {
      console.log("Error cambiando la foto:", error);
    }
  }

  async cambiarVideo(event: any) {
    const file = event.target.files[0];
    const videoRef = ref(this.storage, 'videos/' + file.name);
    this.nuevoVideoSeleccionado = true;
    try {
      await uploadBytes(videoRef, file);
      const url = await getDownloadURL(videoRef);
      this.player.video = url;
    } catch (error) {
      console.log("Error cambiando el video:", error);
    }
  }

  getVideoNameFromUrl(url: string): string {
    const parts = url.split('%2F');
    const fileName = parts[parts.length - 1].split('?')[0];
    return fileName;
  }

  getNombreFoto(url: string): string {
    const parts = url.split('%2F');
    const fileName = parts[parts.length - 1].split('?')[0];
    return fileName;
}

}
