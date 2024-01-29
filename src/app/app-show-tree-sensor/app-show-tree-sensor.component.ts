import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AsideMenuService } from '../../services/aside-menu.service';
import { TreeSensor } from './../../shared/models/devices-tree/treeSensor.model';


@Component({
    selector: 'app-show-tree-sensor',
    templateUrl: './app-show-tree-sensor.component.html'
})
export class AppShowTreeSensorComponent implements OnInit, OnDestroy {
    public treeSensorNode: Object = {};
    public displayTreeSensor = false;

    constructor(private asideMenuService: AsideMenuService) {
        this.asideMenuService.onClickTreeNode.subscribe(data => {
            console.log(data);

            if (data.data instanceof TreeSensor) {
                return this.treeSensorNode = data, this.displayTreeSensor = true
            } else {
                this.displayTreeSensor = false
            }
        });
    }

    ngOnInit() {

    }
    ngOnDestroy() {
    }

}
