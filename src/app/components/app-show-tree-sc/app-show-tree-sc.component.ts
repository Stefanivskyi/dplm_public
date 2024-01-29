import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AsideMenuService } from '../../services/aside-menu.service';
import { TreeSensorConnect } from './../../shared/models/devices-tree/treeSensorConnect.model';


@Component({
    selector: 'app-show-tree-sc',
    templateUrl: './app-show-tree-sc.component.html'
})
export class AppShowTreeScComponent implements OnInit, OnDestroy {
    public treeSCNode: Object = {};
    public displayTreeSC = false;

    constructor(private asideMenuService: AsideMenuService) {
        this.asideMenuService.onClickTreeNode.subscribe(data => {
            console.log(data);

            if (data.data instanceof TreeSensorConnect) {
                return this.treeSCNode = data, this.displayTreeSC = true
            } else {
                this.displayTreeSC = false
            }
        });
    }

    ngOnInit() {

    }
    ngOnDestroy() {
    }

}
