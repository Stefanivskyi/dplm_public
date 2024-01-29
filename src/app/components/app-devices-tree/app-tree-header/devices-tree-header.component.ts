import { TreeProject } from './../../../shared/models/devices-tree/treeProject.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DevicesTreeService } from '../../../services/devices.service';
import { ComponentsModule } from './../../../shared/modules/components.module';


@Component({
  selector: 'app-devices-tree-header',
  templateUrl: './devices-tree-header.component.html',
  styleUrls: ['./devices-tree-header.component.scss']
})

export class AppTreeHeaderComponent {
  devicesName = 'All projects'
  treeHeader: TreeProject[] = [];
  editBtn = false;

  @Input() set treeProject(treeProject: TreeProject[]) {
    this.treeHeader = treeProject;
    this.treeHeader.forEach(project => {
      if (project) {
        this.devicesName = project.name
      }
    })
  }

  constructor(private devicesTreeService: DevicesTreeService) {
    this.devicesTreeService.onClickEditBtn.subscribe(data => this.editBtn = data);
  }

  clickEvent(click) {
    this.devicesTreeService.treeCard(click, 0);
  }
}

