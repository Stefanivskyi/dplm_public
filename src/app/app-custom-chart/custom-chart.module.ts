import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { ChartSharedModule } from '../../shared/modules/chartShared.module';
import { CustomChartComponent } from './custom-chart.component';
import { ChartRoutingModule } from './custom-chart.routing.module.'
import { CustomChartModalComponent } from './custom-chart-modal/custom-chart-modal.component';
import { CustomChartService } from '../../services/custom-chart.service';

@NgModule({
  imports: [
    ChartSharedModule,
    AmChartsModule,
    CommonModule,
    ChartSharedModule,
    FormsModule,
    ChartRoutingModule,
  ],
  declarations: [CustomChartComponent, CustomChartModalComponent],
  providers: [ CustomChartService ]
})
export class CustomChartModule { }
