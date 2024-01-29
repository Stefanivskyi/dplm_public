import { NgModule } from '@angular/core';
import { Routes,
  RouterModule } from '@angular/router';

import {DevicesTreeComponent} from './devices-tree.component';

const routes: Routes = [
  {
    path: '',
    component: DevicesTreeComponent,
    data: {
      title: 'Devices tree'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesTreeRoutingModule {}
