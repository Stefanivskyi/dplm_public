import { Sensor } from './../../../shared/models/sensor.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../../../services/project.service';
import { TemplatesFilterPipe } from '../../../shared/pipe/filter-templates.pipe';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
    templateUrl: 'templates.component.html',
    styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
    templatesData: Sensor[] = [];
    searchText = '';

    constructor(private projectService: ProjectService) { }

    ngOnInit() {
        this.projectService.getProjects().subscribe(
            data => {
                data.forEach(project => {
                    project.devices.forEach(cc => {
                        cc.sensorConnects.forEach(sc => {
                            sc.inputs.forEach(sensor => {
                                this.templatesData.push(sensor)
                            })
                        })
                    })
                })
            }
        );
    }
}
