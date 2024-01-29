import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { ChartSharedModule } from '../../shared/modules/chartShared.module';

@NgModule({
  imports: [
    ChartSharedModule,
    AmChartsModule,
    CommonModule,
    ChartSharedModule,
    FormsModule,
  ],
  declarations: [ ],
  providers: [  ]
})
export class AsideModule { }
