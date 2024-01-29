import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'scChecked'
})
export class SensorConnectCheckboxPipe implements PipeTransform {

    transform(check: any, checkedSC: any): any {
        // console.log('checked', checkedSC);
        return checkedSC
            ? check
            : check.filter(it => it.type !== 'Sensor Connect');
    }
}
