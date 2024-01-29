import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsideMenuService } from '../../services/aside-menu.service';
import { SensorConnect } from '../../shared/models/sensorConnect.model';


@Component({
    selector: 'app-show-paired-sc',
    templateUrl: './app-show-paired-sc.component.html'
})
export class AppShowPairedScComponent implements OnInit, OnDestroy {
    public pairedSC: Object = {};
    public displaySC = false;

    constructor(private asideMenuService: AsideMenuService) {
        this.asideMenuService.onClickFromPairedDevices.subscribe(data => {
          if (data instanceof SensorConnect) {
            return this.pairedSC = data, this.displaySC = true
          } else {
            return this.displaySC = false;
          }
        });
    }

    ngOnInit() {

    }
    ngOnDestroy() {
    }

}
