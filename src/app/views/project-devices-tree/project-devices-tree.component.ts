import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

import { ProjectService } from '../../services/project.service';
import { TreeProject } from '../../shared/models/devices-tree/treeProject.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  templateUrl: 'project-devices-tree.component.html'
})

export class ProjectDevicesTreeComponent implements OnInit, OnDestroy {
  treeProject: TreeProject[] = [];
  mySubscription;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) {
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      const revicesUrl: number = parseInt(params['id'], 10);

      this.projectService.getTreeChildren().subscribe(tree => {
        this.treeProject = tree.filter(project => project.id === revicesUrl);
        this.getTreeObj();
      })
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
      };

      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
            // Trick the Router into believing it's last link wasn't previously loaded
            this.router.navigated = false;
        }
    });
  }
  getTreeObj() {
    console.log(this.treeProject)
  }

  ngOnDestroy() {
    if (this.mySubscription) {
     this.mySubscription.unsubscribe();
    }
    document.querySelector('body').classList.add('aside-menu-hidden');
  }
}
