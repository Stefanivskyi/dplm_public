import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ccChecked'
})
export class CloudConnectCheckboxPipe implements PipeTransform {

    transform(check: any, checkedCC: any): any {
        // console.log('checked', checkedCC);
        return checkedCC
            ? check
            : check.filter(it => it.type !== 'Cloud Connect');
    }
}
