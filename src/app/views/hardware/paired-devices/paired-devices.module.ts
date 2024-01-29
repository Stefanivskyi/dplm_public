import { NgModule } from '@angular/core';

import { PairedDevicesComponent } from './paired-devices.component';
import { PairedDevicesRoutingModule } from './paired-devices-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PairedFilterPipe } from '../../../shared/pipe/filter-paired.pipe';

@NgModule({
  imports: [
    PairedDevicesRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [PairedDevicesComponent, PairedFilterPipe]
})
export class PairedDevicesModule { }
