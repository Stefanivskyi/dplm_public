import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppDevicesTreeComponent } from '../../components/app-devices-tree/app-devices-tree.component';
import { DevicesTreeRoutingModule } from './devices-tree-routing.module';
import { AppTreeComponent } from '../../components/app-devices-tree/app-tree/devices-tree.component';
import { AppTreeHeaderComponent } from '../../components/app-devices-tree/app-tree-header/devices-tree-header.component';
import { DevicesTreeComponent } from './devices-tree.component';
import { ComponentsModule } from './../../shared/modules/components.module';


@NgModule({
  imports: [
    DevicesTreeRoutingModule,
    ChartsModule,
    ComponentsModule
  ],
  declarations: [DevicesTreeComponent]
})
export class DevicesTreeModule { }
