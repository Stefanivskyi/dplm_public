import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsideMenuService } from '../../services/aside-menu.service';
import { Sensor } from '../../shared/models/sensor.model';


@Component({
    selector: 'app-show-paired-sensor',
    templateUrl: './app-show-paired-sensor.component.html'
})
export class AppShowPairedSensorComponent implements OnInit, OnDestroy {
    public pairedSensor: Object = {};
    public displaySensor = false;

    constructor(private asideMenuService: AsideMenuService) {
        this.asideMenuService.onClickFromPairedDevices.subscribe(data => {
          if (data instanceof Sensor) {
            return console.log(this.pairedSensor = data, this.displaySensor = true)
          } else {
            this.displaySensor = false
          }
        });
    }

    ngOnInit() {

    }
    ngOnDestroy() {
    }

}
