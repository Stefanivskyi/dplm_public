import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsideMenuService } from '../../services/aside-menu.service';
import { CloudConnect } from '../../shared/models/cloudConnect.model';


@Component({
    selector: 'app-show-paired-cc',
    templateUrl: './app-show-paired-cc.component.html'
})
export class AppShowPairedCcComponent implements OnInit, OnDestroy {
    public pairedCC: Object = {};
    public displayCC = false;

    constructor(private asideMenuService: AsideMenuService) {
        this.asideMenuService.onClickFromPairedDevices.subscribe(data => {
          if (data instanceof CloudConnect) {
           return console.log(this.pairedCC = data, this.displayCC = true)
          } else {
           return this.displayCC = false;
          }
        });
    }

    ngOnInit() {

    }

    ngOnDestroy() {
    }

}
