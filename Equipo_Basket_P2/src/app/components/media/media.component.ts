import { Player } from '../../model/players';
import { Component, ViewChild, ElementRef } from "@angular/core";
import { OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PlayersService} from '../../service/players.service';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-media-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})


export class MediaComponent {

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
  player: any;
  private sub: any


  constructor(private route: ActivatedRoute, private PlayerServie:PlayersService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.player = this.PlayerServie.getPlayerById(this.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

export default MediaComponent;
