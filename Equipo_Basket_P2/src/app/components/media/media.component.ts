import { Player } from '../../model/players';
import { Component, ViewChild, ElementRef } from "@angular/core";
import { OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {PlayersService} from '../../service/players.service';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-media-component',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})


export class MediaComponent{

  @Input() player: any;



  name = "Angular";
  @ViewChild("videoPlayer", { static: false }) videoplayer!: ElementRef;
  isPlay: boolean = false;
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
  }

  playPause() {
    var myVideo: any = document.getElementById("my_video");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }
  skip(value: any) {
    let video: any = document.getElementById("my_video");
    video.currentTime += value;
  }

  restart() {
    let video: any = document.getElementById("my_video");
    video.currentTime = 0;
  }

  id: any;
  private sub: any


  constructor(private route: ActivatedRoute, private PlayerService:PlayersService) {}

//   ngOnInit() {
//     console.log(this.playerId);
//     this.datosPlayerService.getPlayerById( this.playerId ).subscribe( player => {
//       console.log(player)
//       this.player = player;
//     });
//   }

//   ngOnChanges(changes: SimpleChanges) {

//     this.doSomething(changes.categoryId.currentValue);
//     // You can also use categoryId.previousValue and
//     // categoryId.firstChange for comparing old and new values

// }

//   ngOnDestroy() {
//     this.sub.unsubscribe();
//   }
}

export default MediaComponent;
