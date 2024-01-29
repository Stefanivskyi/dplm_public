import { Project } from '../../shared/models/project.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-building',
  templateUrl: 'building.component.html',
  styleUrls: ['./building.component.scss']
})

export class BuildingComponent implements OnInit {

  projects: Project[];
  buildingStatus = 'ok';

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(p => {
      this.projects = p;
      console.log('initializing of BuildingComponent, projects: ' + this.projects)
    })
  }
}
