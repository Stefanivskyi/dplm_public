import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppDevicesTreeComponent } from '../../components/app-devices-tree/app-devices-tree.component';
import { AppTreeComponent } from '../../components/app-devices-tree/app-tree/devices-tree.component';
import { AppTreeHeaderComponent } from '../../components/app-devices-tree/app-tree-header/devices-tree-header.component';
import { DevicesTreeService } from './../../services/devices.service';

@NgModule({
    imports: [CommonModule],
    declarations: [AppDevicesTreeComponent, AppTreeComponent, AppTreeHeaderComponent],
    providers: [DevicesTreeService],
    exports: [AppDevicesTreeComponent, AppTreeComponent, AppTreeHeaderComponent]
})
export class ComponentsModule { }
