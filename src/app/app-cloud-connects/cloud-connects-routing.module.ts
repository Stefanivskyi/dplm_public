import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { CloudConnectsComponent } from './cloud-connects.component';

const routes: Routes = [
  {
    path: '',
    component: CloudConnectsComponent,
    data: {
      title: 'Cloud Connects'
    },
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloudConnectsRoutingModule {}

