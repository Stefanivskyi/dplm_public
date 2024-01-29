import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { SensorConnect } from '../../../shared/models/sensorConnect.model';
import { ActivatedRoute } from '@angular/router';
import { CloudConnect } from '../../../shared/models/cloudConnect.model';
import { Sensor } from '../../../shared/models/sensor.model';


@Component({
    templateUrl: 'custom-chart-modal.component.html',
    styleUrls: ['custom-chart-modal.component.scss'],
    selector: 'app-custom-chart-modal'
})
export class CustomChartModalComponent implements OnInit {
    SC: SensorConnect[] = [];
    CC: CloudConnect[];
    s: Sensor[] = [];
    sensorClicked = true;
    isSelected = false;
    @Output() sensorClickEvent = new EventEmitter

    constructor(private projectService: ProjectService, private router: ActivatedRoute) {
    }

    clickEvent(sc) {
    }

    sensorClick(sensor) {
        sensor.isSelected = true;
        this.sensorClickEvent.emit(sensor)
        sensor.sensorClicked = !sensor.sensorClicked;
    }

    ngOnInit() {
        this.projectService.getProjects().forEach(project => {
            project.forEach(device => {
                this.router.params.subscribe(params => {
                    const activeCloudConnect: number = parseInt(params['id'], 10)
                    device.devices.filter(devices => device.id === activeCloudConnect).forEach(cloudConnect => {
                        cloudConnect.sensorConnects.forEach(sensorConnect => {
                            this.SC.push(sensorConnect)
                            sensorConnect.inputs.forEach(sensor => {
                                this.s.push(sensor)
                            })
                        })
                    })
                })
            })
        })

    }
}

