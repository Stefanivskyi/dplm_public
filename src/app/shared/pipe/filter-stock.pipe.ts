import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class StockFilterPipe implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
        if (!items) { return [] };
        if (!searchText) { return items };
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return this.contains(it.name, searchText) ||
                this.contains(it.project, searchText) ||
                this.contains(it.type, searchText) ||
                this.contains(it.id, searchText);
        });
    }

    contains(input: string, searchText: string) {
        return input.toLowerCase().includes(searchText);
    }
}
