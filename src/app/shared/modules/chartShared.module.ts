import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartComponent } from '../../components/app-chart/containers/chart.component';
import { LegendComponent } from '../../components/app-chart/components/legend/legend.component'
import { PeriodComponent } from '../../components/app-chart/components/period/period.component'
import { AmChartComponent } from '../../components/app-chart/components/am-chart/am-chart.component'
import { ChartService } from '../../services/chart.service'
import { ModalModule } from 'ngx-bootstrap';
import { AppChartLoaderComponent } from './../../components/app-chart-loader/app-chart-loader.component';
import { AppNoDataChartComponent } from './../../components/app-no-data-chart/app-no-data-chart.component';
import { ChannelComponent } from '../../components/app-chart/components/channel/channel.component';

@NgModule({
    imports: [CommonModule, FormsModule, ModalModule.forRoot()],

    declarations: [
        ChartComponent,
        LegendComponent,
        ChannelComponent,
        PeriodComponent,
        AmChartComponent,
        AppChartLoaderComponent,
        AppNoDataChartComponent],

    providers: [ChartService],

    exports: [
        ChartComponent,
        LegendComponent,
        ChannelComponent,
        ModalModule,
        PeriodComponent,
        AmChartComponent,
        AppChartLoaderComponent,
        AppNoDataChartComponent]
})

export class ChartSharedModule { }
