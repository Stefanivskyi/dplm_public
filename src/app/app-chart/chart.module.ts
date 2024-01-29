import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ChartRoutingModule } from './chart-routing.module';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { AmChartComponent } from './components/am-chart/am-chart.component';
import { LegendComponent } from './components/legend/legend.component';
import { PeriodComponent } from './components/period/period.component';
import { MobxAngularModule } from 'mobx-angular';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from '../app-chart/containers/chart.component'
import { ChartService } from '../../services/chart.service'
import { ChartSharedModule } from '../../shared/modules/chartShared.module'

@NgModule({
    imports: [ChartRoutingModule, ChartSharedModule, FormsModule, AmChartsModule, CommonModule, BsDropdownModule,
          MobxAngularModule],
    declarations: [ ],
    providers: [
        ChartService
    ]
})
export class ChartModule {}
