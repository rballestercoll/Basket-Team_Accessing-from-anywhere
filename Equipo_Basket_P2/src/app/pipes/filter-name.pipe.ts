import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter',
  standalone: true,
})
export class FilterNamePipe implements PipeTransform {
  transform(items: any[], searchText: string, opcion: string, opcion2: string): any[] {
    if (!items) return [];

    // Si no hay filtro de búsqueda ni opción de posición, retornamos todos los items
    if (!searchText && (!opcion2 || opcion2.toLowerCase() === 'todos')) {
      return items;
    }

    // Convertimos los parámetros a minúsculas para comparación
    searchText = searchText ? searchText.toLowerCase() : '';
    opcion = opcion ? opcion.toLowerCase() : '';
    opcion2 = opcion2 ? opcion2.toLowerCase() : '';

    let filteredItems = items;

    // Filtrado por posición (opcion2)
    if (opcion2 && opcion2 !== 'todos') {
      filteredItems = filteredItems.filter((item: any) => {
        return item.position?.toLowerCase() === opcion2;
      });
    }

    // Filtrado por búsqueda (searchText) y opción (opcion)
    if (searchText) {
      filteredItems = filteredItems.filter((item: any) => {
        if (opcion === 'nombre') {
          return item.name?.toLowerCase().includes(searchText);
        } else if (opcion === 'posicion') {
          return item.position?.toLowerCase().includes(searchText);
        } else if (opcion === 'edad') {
          return item.age?.toString().includes(searchText);
        } else {
          // Si la opción no coincide, filtramos por nombre por defecto
          return item.name?.toLowerCase().includes(searchText);
        }
      });
    }

    return filteredItems;
  }
}
