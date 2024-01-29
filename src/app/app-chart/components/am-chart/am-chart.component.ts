import {
  Component,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
  AfterContentInit
} from '@angular/core';

import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { SensorData } from '../../../../shared/models/charts.model';
import { Sensor } from '../../../../shared/models/sensor.model';
import { DataProviderModel } from '../../../../shared/models/dataProvider.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'am-chart.component.html',
  selector: 'app-am-chart'
})

export class AmChartComponent implements OnDestroy {

  static counter = 0;
  chartsNumber: number;

  public chart: AmChart;

  @Input() set dataProvider(dataProvider: DataProviderModel) {

    const divElement = document.getElementById('chartId') as HTMLDivElement;
    if (divElement) {
      divElement.id = this.getChartId();
    }

    if (!this.chart) {
      this.chart = this.AmCharts.makeChart(this.getChartId(), this.getChartDefaultOptions());
    }

    if (dataProvider) {
      console.log('am-charts, setting dataProvider: ' + dataProvider.metrics.length);

      this.chart.dataProvider = dataProvider.metrics;
      this.chart.graphs = this.getGraphs(dataProvider.sensors);
      this.chart.valueAxes = this.getValueAxes(dataProvider.sensors);

      this.AmCharts.updateChart(this.chart, () => {
        this.chart.dataProvider = dataProvider.metrics;
      });
    }
  }

  constructor(private AmCharts: AmChartsService) {
    AmChartComponent.counter++;
    this.chartsNumber = AmChartComponent.counter;
  }

  public getChartId() {
    return 'chart_' + this.chartsNumber;
  }

  getChartDefaultOptions() {
    return {
      type: 'serial',

      categoryField: 'dateTime',
      dataDateFormat: 'YYYY-MM-DD JJ:NN:SS',

      mouseWheelZoomEnabled: true,
      synchronizeGrid: false,
      glueToTheEnd: true,

      numberFormatter: {
        precision: -1,
        decimalSeparator: ',',
        thousandsSeparator: ''
      },

      categoryAxis: {
        autoRotateCount: 0,
        minPeriod: 'ss',
        parseDates: true,
        position: 'top',
        minorGridEnabled: false
      },

      chartCursor: {
        valueLineEnabled: true,
        valueLineBalloonEnabled: true,
        cursorAlpha: 1,
        cursorColor: '#258cbb',
        valueLineAlpha: 0.2,

        // allow only horizontal zooming (non-rectangular)
        valueZoomable: false,
        categoryBalloonDateFormat: 'YYYY-MM-DD JJ:NN:SS'
      },

      chartScrollbar: {
        color: '#888888',
        scrollbarHeight: 70,
        backgroundAlpha: .2,
        selectedBackgroundAlpha: .4,
        selectedBackgroundColor: '#888888',
        graphFillAlpha: 0,
        autoGridCount: true,
        selectedGraphFillAlpha: 0,
        graphLineAlpha: .2,
        graphLineColor: '#c2c2c2',
        selectedGraphLineColor: '#888888',
        selectedGraphLineAlpha: 1
      },

      valueScrollbar: {
        enabled: false,
        oppositeAxis: false,
        offset: 20,
        scrollbarHeight: 10
      },
      trendLines: [],
      guides: [],
      allLabels: [],
      balloon: {},
    }
  }

  getValueAxes(sensors: Sensor[]) {
    if (sensors) {
      return sensors.map((s, index, array) => {
        return {
          id: s.getSensorCombinedId(),
          offset: index * 50 + 30,
          position: 'right',
          axisAlpha: 1,
          axisThickness: 2,
          axisColor: s.graphColor
        }
      })
    }
  }

  getGraphs(sensors: Sensor[]) {
    if (sensors) {
      return sensors.map(s => {

        let fill = 0;
        let lineType = 'line';

        if (s.getName() && s.getName().includes('Power')) {
          fill = 0.3;
          lineType = 'step';
        }

        return {
          lineColor: s.graphColor,
          title: s.getName(),

          valueField: s.getSensorCombinedId(),
          valueAxis: s.getSensorCombinedId(),
          type: lineType,
          fillAlphas: fill,

          gapPeriod: 3600,
          forceGap: true,
          balloonText: '<b>[[title]]</b> - <b>[[value]]</b>',
          bullet: 'round',
          bulletBorderAlpha: 1,
          bulletColor: '#FFFFFF',
          bulletSize: 5,
          hideBulletsCount: 120,
          useLineColorForBulletBorder: true,
          bulletBorderThickness: 1,
          lineThickness: 1,
        };
      })
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }
}
