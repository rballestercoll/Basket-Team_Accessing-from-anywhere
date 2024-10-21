import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../model/players';

@Pipe({
  name: 'filterName',
  standalone: true
})
export class FilterNamePipe implements PipeTransform {
  transform(players: Player[], searchText: string, opcion: string): Player[] {
    if (!players) return [];
    if (!searchText) return players;

    searchText = searchText.toLowerCase();
    opcion = opcion.toLowerCase();

    return players.filter(player => {
      switch (opcion) {
        case 'nombre':
          return player.nombre.toLowerCase().includes(searchText);
        case 'posicion':
          return player.posicion.toLowerCase().includes(searchText);
        case 'edad':
          return player.edad.toString().includes(searchText);
        default:
          return false;
      }
    });
  }
}
