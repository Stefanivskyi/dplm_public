import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ProjectDevicesTreeRoutingModule } from './project-devices-tree-routing.module';
import { ProjectDevicesTreeComponent } from './project-devices-tree.component';

import { AppDevicesTreeComponent } from '../../components/app-devices-tree/app-devices-tree.component';
import { AppTreeComponent } from '../../components/app-devices-tree/app-tree/devices-tree.component';
import { AppTreeHeaderComponent } from '../../components/app-devices-tree/app-tree-header/devices-tree-header.component';
import { ComponentsModule } from './../../shared/modules/components.module';


@NgModule({
    imports: [
        ProjectDevicesTreeRoutingModule,
        ChartsModule,
        ComponentsModule
    ],
    declarations: [ProjectDevicesTreeComponent]
})
export class ProjectDevicesTreeModule { }
