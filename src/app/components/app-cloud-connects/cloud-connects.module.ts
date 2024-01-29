import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { CloudConnectsComponent } from './cloud-connects.component';
import { CloudConnectsRoutingModule } from './cloud-connects-routing.module';
import { CommonModule } from '@angular/common';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { ChartSharedModule } from '../../shared/modules/chartShared.module';

@NgModule({
  imports: [
    CloudConnectsRoutingModule,
    AmChartsModule,
    CommonModule,
    ChartSharedModule,
    FormsModule
  ],
  declarations: [CloudConnectsComponent],
  providers: [
  ]
})
export class CloudConnectsModule { }
