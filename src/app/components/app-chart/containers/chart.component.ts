import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

import { Project } from '../../../shared/models/project.model';
import { SensorConnect } from '../../../shared/models/sensorConnect.model';
import { SensorData } from '../../../shared/models/charts.model';
import { MetricsModel } from '../../../shared/models/metrics.model';
import { Sensor } from '../../../shared/models/sensor.model';
import { PeriodHoursEnum } from '../../../shared/enums/period.hours.enum';
import { DataProviderModel } from '../../../shared/models/dataProvider.model';

import { ChartService } from '../../../services/chart.service';
import { ProjectService } from '../../../services/project.service';
import { ChartLoaderService } from './../../../services/chart-loader.service';
import { RealtimeService } from '../../../services/realtime.service';
import { SubscribeSensor } from '../../../shared/models/realtime/subscribeSensor.model';
import { CustomChart } from '../../../shared/models/custom-chart/custom-chart.model';
import { CustomSensor } from '../../../shared/models/custom-chart/custom-chart-sensor.model';
import { ChannelModel } from '../components/period/channel.model';

@Component({
  templateUrl: 'chart.component.html',
  selector: 'app-chart'
})

export class ChartComponent implements OnInit {
  public metrics: DataProviderModel;

  private lastReadSensors: Sensor[];
  private lastReadStart: Date;
  private lastReadEnd: Date;
  private lastReadChannel: number;

  private loader: Subscription;
  public displayLoader: boolean;
  public displayNoData: boolean;

  private realtimeConnected: boolean;

  public filteredSensors: Sensor[];

  private _sensors: Sensor[];
  @Input() set sensor(sensors) {
    this._sensors = sensors;
    this.updateFilteredSensors(this.lastReadChannel);
  }

  @Input() sensorConnect: SensorConnect
  @Input() customChartName: string

  constructor(
    private chartService: ChartService, private projectService: ProjectService, private realtimeService: RealtimeService) {     }

  sensorsChangedEvent(selectedSensors: Sensor[]) {
    if (this.realtimeConnected) {
      if (this.lastReadSensors !== undefined) {
        this.lastReadSensors.forEach(s => {
          this.unsubscribeFromRealtime(s);
        })
      }
    }

    this.lastReadSensors = selectedSensors;

    if (this.realtimeConnected) {
      this.lastReadSensors.forEach(s => {
        this.subscribeForRealtime(s);
      })
    }

    this.updateChart();
  }

  periodChangedEvent({ start, end }) {
    this.lastReadStart = start;
    this.lastReadEnd = end;

    this.updateChart();
  }

  channelChangedEvent(channel: ChannelModel) {
    if (channel) {
      this.lastReadChannel = channel.index;
      this.updateFilteredSensors(this.lastReadChannel);

      this.lastReadSensors = [];
      this.updateChart();
    }
  }

  updateFilteredSensors(channel: number) {
    this.filteredSensors = [];
    this._sensors.forEach(s => {
      if (s.ChannelNumber === channel) {
        this.filteredSensors.push(s);
      }
    })
  }

  realtimeStateChangedEvent({ active }) {
    console.log('realtime state changed to: ' + active);

    if (this.lastReadSensors) {
      this.lastReadSensors.forEach(sensor => {
        if (active) {
          this.subscribeForRealtime(sensor);
        } else {
          this.unsubscribeFromRealtime(sensor);
        }
      })
    }
  }

  subscribeForRealtime(s: Sensor) {
    const ss = new SubscribeSensor(s.sensorConnectChipId, s.SensorNumber, s.ChannelNumber);

    this.realtimeService.subscribe(ss, this.realtimeMetricCallback)
          .then(result => {
            this.realtimeService.checkSubscription(ss.sensorChipId, ss.sensorNumber, ss.channelNumber)
              .then(isSubscribed => {
                this.realtimeConnected = isSubscribed;
            })
          });
  }

  unsubscribeFromRealtime(s: Sensor) {
    this.realtimeService.unsubscribe(
      new SubscribeSensor(s.sensorConnectChipId, s.SensorNumber, s.ChannelNumber));
  }

  public getChartName(): string {
    return this.sensorConnect ?
      (this.sensorConnect.name ? this.sensorConnect.name  : this.sensorConnect.sensorChipId) : this.customChartName
  }


  updateChart() {
    if (!this.lastReadSensors) {
      return;
    }
    if (!this.lastReadStart || !this.lastReadEnd) {
      return;
    }

    const scId = this.sensorConnect ? this.sensorConnect.sensorChipId : '<unknown>';
    console.log(`updating chart: ${scId}.....start: ${this.lastReadStart}; end: ${this.lastReadEnd}; sensors selected: ${
      this.lastReadSensors.length}`);

    this.displayLoader = true;

    this.chartService
      .getPeriod(this.lastReadStart, this.lastReadEnd, this.lastReadSensors)
      .subscribe(resultArray => {
        const metrics = [];
        resultArray.forEach(sensorData => {
          const sensorIdentifier =
            sensorData.sensorConnectChipId + '__' + sensorData.sensorId + '__' + sensorData.channel;

          sensorData.metrics.forEach(metric => {
            metrics.push({
              dateTime: metric.dateTime,
              [sensorIdentifier]: metric.s
            });
          })

        });

        const metrics2 = _.groupBy(metrics, m => m.dateTime);
        let resultMetrics = [];

        // tslint:disable-next-line:forin
        for (const k in metrics2) {
          const dateTimeValues = [];
          metrics2[k].forEach(m => {

            const keyValues = _.toPairs(<any>m);
            keyValues.forEach(kv => {
              dateTimeValues.push(kv);
            });
          });

          resultMetrics.push(_.fromPairs(dateTimeValues));
        }

        resultMetrics = _.sortBy<any>(resultMetrics, a => a.dateTime);

        this.displayLoader = false;

        if (this.lastReadSensors.length === 0) {
          this.displayNoData = true
        } else {
          this.displayNoData = false
        }

        this.metrics = new DataProviderModel(this.lastReadSensors, resultMetrics);
        console.log(this.metrics);
      });
  }

  realtimeMetricCallback = (sensorChipId: string, sensorNumber: number, channelNumber: number, dateTime: string, s: number ) => {
    if (this.metrics) {
      const key = sensorChipId + '__' + sensorNumber + '__' + channelNumber;


      const d = new Date(dateTime + 'Z');
      const metric = { 'dateTime': d.toISOString(), [key]: s };

      this.metrics.metrics.shift();
      this.metrics.metrics.push(metric);

      this.metrics = new DataProviderModel(this.metrics.sensors, this.metrics.metrics);
    }
  }

  ngOnInit() {
  }
}
