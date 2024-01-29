import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AsideMenuService } from '../../services/aside-menu.service';


@Component({
    selector: 'app-show-aside-stock',
    templateUrl: './app-show-aside-stock.component.html'
})
export class AppShowAsideStockComponent implements OnInit, OnDestroy {
    public stockData: Object = {};
    public displayStock = false;

    constructor(private asideMenuService: AsideMenuService) {
        this.asideMenuService.onClickFromStock.subscribe(data => {
            this.stockData = data, this.displayStock = true
        });
    }

    ngOnInit() {

    }
    ngOnDestroy() {
    }

}
