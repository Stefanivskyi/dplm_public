import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AsideMenuService } from '../../services/aside-menu.service';
import { TreeCloudConnect } from './../../shared/models/devices-tree/treeCloudConnect.model';


@Component({
    selector: 'app-show-tree-cc',
    templateUrl: './app-show-tree-cc.component.html'
})
export class AppShowTreeCcComponent implements OnInit, OnDestroy {
    public treeCCNode: Object = {};
    public displayTreeCC = false;

    constructor(private asideMenuService: AsideMenuService) {
        this.asideMenuService.onClickTreeNode.subscribe(data => {
            console.log(data);

            if (data.data instanceof TreeCloudConnect) {
                return this.treeCCNode = data, this.displayTreeCC = true
            } else {
                this.displayTreeCC = false
            }
        });
    }

    ngOnInit() {

    }
    ngOnDestroy() {
    }

}
