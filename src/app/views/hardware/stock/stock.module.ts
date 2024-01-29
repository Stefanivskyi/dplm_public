import { NgModule } from '@angular/core';

import { StockComponent } from './stock.component';
import { StockRoutingModule } from './stock-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockFilterPipe } from '../../../shared/pipe/filter-stock.pipe';
import { CloudConnectCheckboxPipe } from '../../../shared/pipe/cc-checkbox.pipe';
import { SensorConnectCheckboxPipe } from '../../../shared/pipe/sc-checkbox.pipe';

@NgModule({
  imports: [
    StockRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [StockComponent, StockFilterPipe, CloudConnectCheckboxPipe, SensorConnectCheckboxPipe]
})
export class StockModule { }
