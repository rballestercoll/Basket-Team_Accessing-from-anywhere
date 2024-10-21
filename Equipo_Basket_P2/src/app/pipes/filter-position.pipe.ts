import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../model/players';

@Pipe({
  name: 'filterPosition',
  standalone: true
})
export class FilterPositionPipe implements PipeTransform {

  transform(players: Player[], position: string): Player[] {
    if (!players || !position) {
      return players;
    }
    return players.filter(player => player.posicion === position);
  }
}
