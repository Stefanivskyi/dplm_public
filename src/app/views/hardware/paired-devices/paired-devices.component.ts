import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

import { PairedFilterPipe } from '../../../shared/pipe/filter-paired.pipe';
import { ProjectService } from '../../../services/project.service';
import { AsideMenuService } from '../../../services/aside-menu.service';
import { PairedCc } from '../../../shared/models/paired-devices/paired-cc.model';
import { PairedSc } from '../../../shared/models/paired-devices/paired-sc.model';
import { SensorConnect } from '../../../shared/models/sensorConnect.model';
import { CloudConnect } from '../../../shared/models/cloudConnect.model';
import { Sensor } from '../../../shared/models/sensor.model';


@Component({
    templateUrl: 'paired-devices.component.html',
    styleUrls: ['./paired-devices.component.scss']
})
export class PairedDevicesComponent implements OnInit {
    ccData: CloudConnect[] = [];
    scData: SensorConnect[] = [];
    sensorData: Sensor[] = [];
    searchText = '';
    showSC = false;
    isSelected = false;

    constructor(private projectService: ProjectService, private asideMenuService: AsideMenuService) {
    }

    clickEventCC(cc) {
        cc.showSC = !cc.showSC;
        cc.isSelected = !cc.isSelected;
        if (cc.isSelected) {
          this.asideMenuService.getAsidePairedDevices(cc);
        } else {
          this.asideMenuService.getAsidePairedDevices({});
        }
      document.querySelector('body').classList.remove('aside-menu-hidden');
    }

    clickEventSC(sc) {
        sc.showSensor = !sc.showSensor;
        sc.isSelected = !sc.isSelected;
        if (sc.isSelected) {
          this.asideMenuService.getAsidePairedDevices(sc);
        } else {
          this.asideMenuService.getAsidePairedDevices({});
        }
      document.querySelector('body').classList.remove('aside-menu-hidden');
    }

    clickEventSensor(sensor) {
      this.asideMenuService.getAsidePairedDevices(sensor);
        document.querySelector('body').classList.remove('aside-menu-hidden');
    }

    ngOnInit() {
        this.projectService.getProjects().subscribe(
            data => {
                data.forEach(project => {
                    project.devices.forEach(cc => {
                        this.ccData.push(cc);
                        cc.sensorConnects.forEach(sc => {
                            this.scData.push(sc);
                            sc.inputs.forEach(sensor => {
                                this.sensorData.push(sensor);
                            })
                        })
                    });
                })
            })
    }
}

