import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import {ProjectDevicesTreeComponent} from './project-devices-tree.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectDevicesTreeComponent,
    data: {
      title: 'Project devices tree'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDevicesTreeRoutingModule {}
