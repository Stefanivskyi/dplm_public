import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AsideMenuService } from '../../services/aside-menu.service';
import { TreeCloudConnect } from './../../shared/models/devices-tree/treeCloudConnect.model';
import { TreeSensorConnect } from './../../shared/models/devices-tree/treeSensorConnect.model';
import { TreeSensor } from './../../shared/models/devices-tree/treeSensor.model';


@Component({
    selector: 'app-show-tree-project',
    templateUrl: './app-show-tree-project.component.html'
})
export class AppShowTreeProjectComponent implements OnInit, OnDestroy {
    public treeProjectNode: Object = {};
    public displayTreeProject = false;

    constructor(private asideMenuService: AsideMenuService) {
        this.asideMenuService.onClickTreeNode.subscribe(data => {
            console.log(data);
            if (!(data.data instanceof TreeSensor || data.data instanceof TreeSensorConnect || data.data instanceof TreeCloudConnect)) {
                return this.treeProjectNode = data, this.displayTreeProject = true
            } else {
                this.displayTreeProject = false
            }
        });
    }

    ngOnInit() {

    }
    ngOnDestroy() {
    }

}
