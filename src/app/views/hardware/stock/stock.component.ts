import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HardwareStock } from '../../../shared/models/hardware-stock/stock.model';
import { ProjectService } from '../../../services/project.service';
import { AsideMenuService } from '../../../services/aside-menu.service';

import { StockFilterPipe } from '../../../shared/pipe/filter-stock.pipe';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
    templateUrl: 'stock.component.html',
    styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
    stockData: HardwareStock[] = [];
    searchText = '';
    checkedSC = true;
    checkedCC = true;
    dataForAside: Object = {};

    constructor(private projectService: ProjectService,  private asideMenuService: AsideMenuService) {
      this.asideMenuService.onClickFromStock.subscribe(data => this.dataForAside = data);
    }

  clickEvent(stock) {
    this.asideMenuService.getAsideStock(stock);
    document.querySelector('body').classList.remove('aside-menu-hidden');
  }

    ngOnInit() {
        this.projectService.getProjects().subscribe(
            data => {
                data.forEach(project => {
                    project.devices.forEach(cc => {
                        this.stockData.push({
                            name: cc.name,
                            type: 'Cloud Connect',
                            id: cc.chipId,
                            project: project.name,
                        })
                        cc.sensorConnects.forEach(sc => {
                            this.stockData.push({
                                name: sc.name,
                                type: 'Sensor Connect',
                                id: sc.sensorChipId,
                                project: project.name,
                            })
                        })
                        return this.stockData; // useless
                    })
                })
            }
        );
    }
}
