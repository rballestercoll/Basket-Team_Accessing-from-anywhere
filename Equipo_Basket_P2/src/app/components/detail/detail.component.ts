import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MediaComponent } from '../media/media.component';
import { PlayersService } from '../../service/players.service';
import { Subscription } from 'rxjs';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-detail-component',
  standalone: true,
  imports: [RouterModule, MediaComponent, CommonModule, EditPlayerComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  id!: string;
  player: any;
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
    this.sub.unsubscribe();
  }

  // Método para abrir el modal
  openModal() {
    this.modalOpen = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalOpen = false;
  }
}
