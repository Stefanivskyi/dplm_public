import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PairedDevicesComponent } from './paired-devices.component';

const routes: Routes = [
  {
    path: '',
    component: PairedDevicesComponent,
    data: {
      title: 'Paired devices'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PairedDevicesRoutingModule {}
