import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MediaComponent } from '../media/media.component';
import { PlayersService } from '../../service/players.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-detail-component',
  standalone: true,
  imports: [RouterModule, MediaComponent, CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  id!: string;
  @Input() player?: any;
  modalOpen = false;
  mensaje: string = '';
  private sub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private PlayerService: PlayersService) {}

  ngOnInit() {
    this.sub.add(
      this.route.params.subscribe(params => {
        this.id = params['id'];
        if (this.id) {
          this.sub.add(
            this.PlayerService.getPlayerById(this.id).subscribe(playerData => {
              this.player = playerData;
            })
          );
        }
      })
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // Método para guardar los cambios del jugador
  guardarCambios() {
    this.PlayerService.updatePlayer(this.player.id, this.player)
      .then(() => {
        this.mensaje = 'Jugador actualizado correctamente.';
        console.log('Jugador actualizado correctamente');
      })
      .catch((error: any) => {
        this.mensaje = 'Error al actualizar el jugador.';
        console.error('Error al actualizar el jugador:', error);
      });
  }


  openModal(id: string) {
    this.PlayerService.getPlayerById(id).subscribe(player => {
      this.player = player;

      this.modalOpen = true; // Abre el modal
      const modal = document.querySelector('.modalEditar');
      if (modal){
        modal.classList.add('d-block');
      }
    });


  }
}













/*import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class DetailComponent implements OnInit {
  @Input() player: any;
  @Output() cerrarDetalle = new EventEmitter<void>();
  id: string | null = null;
  modalOpen = false;
  mensaje: string = '';


   // Método para cerrar el detalle
   cerrar() {
    this.cerrarDetalle.emit();
  }

  constructor(private route: ActivatedRoute, private PlayersService: PlayersService) {}



  ngOnInit(): void {
    // Obtener el ID de la ruta
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      // Obtener los datos del jugador
      this.PlayersService.getPlayerById(this.id).subscribe(
        (playerData) => {
          this.player = playerData;
        },
        (error) => {
          console.error('Error al obtener el jugador:', error);
        }
      );
    } else {
      console.error('No se proporcionó un ID de jugador en la ruta.');
    }
  }


  /*ngOnInit(): void {
    // Obtener el ID de la ruta
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      // Obtener los datos del jugador
      this.PlayersService.getPlayerById(this.id).subscribe((playerData) => {
        this.player = playerData;
      });
    }
  }*/

  // Método para guardar los cambios del jugador
 /* guardarCambios() {
    this.PlayersService.edit(this.player.id, this.player)
      .then(() => {
        this.mensaje = 'Jugador actualizado correctamente.';
        console.log('Jugador actualizado correctamente');
      })
      .catch(error => {
        this.mensaje = 'Error al actualizar el jugador.';
        console.error('Error al actualizar el jugador:', error);
      });
  }


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


}*/
