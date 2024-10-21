import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MediaComponent } from '../media/media.component';
import {PlayersService} from '../../service/players.service';

@Component({
  selector: 'app-detail-component',
  standalone: true,
  imports: [RouterModule, MediaComponent, CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'] // Corregido de 'styleUrl' a 'styleUrls'
})
export class DetailComponent implements OnInit, OnDestroy {
  id!: number;
  player?: any;
  private sub: any;

  constructor(private route: ActivatedRoute, private PlayerServie:PlayersService) {}

  ngOnInit() {
    console.log("muestra");
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.player = this.PlayerServie.getPlayerById(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
