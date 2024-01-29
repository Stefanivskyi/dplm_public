import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BuildingComponent } from '../../components/app-building/building.component';
import { AppDashboardMapComponent } from '../../components/app-dashboard-map/app-dashboard-map.component';
import { CommonModule } from '@angular/common';
import { AmChartsService } from '@amcharts/amcharts3-angular';


@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    CommonModule
  ],
  declarations: [DashboardComponent, BuildingComponent, AppDashboardMapComponent],
  providers: [ AmChartsService ]
})
export class DashboardModule { }
