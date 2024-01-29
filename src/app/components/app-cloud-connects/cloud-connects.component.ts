import { Component, OnInit, Input } from '@angular/core';
import { SensorConnect } from '../../shared/models/sensorConnect.model';
import { ActivatedRoute, Router } from '@angular/router'
import { CloudConnect } from '../../shared/models/cloudConnect.model';
import { ProjectService } from '../../services/project.service';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { Sensor } from '../../shared/models/sensor.model';

@Component({
    selector: 'app-cloud-connect',
    templateUrl: 'cloud-connects.component.html'
})
export class CloudConnectsComponent implements OnInit {

    sensorConnects: SensorConnect[] = [];

    constructor(private projectSerivce: ProjectService, private route: ActivatedRoute) {
    }

    ngOnInit() {

        this.projectSerivce.getProjects().forEach(projects => {
            projects.forEach(project => {
                project.devices.forEach(cloudConnect => {
                    this.route.params.subscribe(params => {
                        if (cloudConnect.name === params['id']) {
                            const overrideSensorConnects = []
                            cloudConnect.sensorConnects.forEach(sensorConnect => {
                                overrideSensorConnects.push(sensorConnect)
                                this.sensorConnects = overrideSensorConnects
                            })
                        }
                    })
                })
            })
        })
    }
}
