import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'nameFilter',
    standalone:true

    })

export class FilterNamePipe implements PipeTransform {
    transform(items: any[], searchText:string,opcion:string, opcion2:string ): any[] {
        if (!items) return[];
        if (!searchText && !opcion2.length) return items;

        searchText=searchText.toLowerCase();
        opcion=opcion.toLowerCase();
        opcion2=opcion2.toLowerCase();
        let aux = items;

        if (!!opcion2.length && opcion2 != 'todos')
        {
            return items.filter((item: any) =>{
                return item.position.toLowerCase().includes(opcion2);
            })
        }
        else if (opcion=="edad")
        {
            return items.filter((item: any) => {
                return item.edad.toLowerCase().includes(searchText);
            })
        }
        else
        {
            return items.filter((item: any) => {
                return item.nombre.toLowerCase().includes(searchText);

            })
        }
    }
}
