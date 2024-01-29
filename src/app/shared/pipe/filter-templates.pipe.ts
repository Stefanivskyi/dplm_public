import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class TemplatesFilterPipe implements PipeTransform {

    transform(items: any[], searchText: string): any[] {
        if (!items) { return [] };
        if (!searchText) { return items };
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return this.contains(it.getName(), searchText) ||
                this.contains(it.sensorType, searchText) ||
                this.contains(it.brand, searchText);
        });
    }

    contains(input: string, searchText: string) {
        return input.toString().toLowerCase().includes(searchText);
    }
}
