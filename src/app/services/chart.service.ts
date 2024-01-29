import { Injectable } from '@angular/core';
import { HttpClientService } from '../asyncServices/http-client.service';
import { MetricsModel } from '../shared/models/metrics.model';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, filter, scan } from 'rxjs/operators';
import { SensorData } from '../shared/models/charts.model'
import { Sensor } from '../shared/models/sensor.model'

@Injectable()
export class ChartService {
    a: Observable<any>;
    constructor(private http: HttpClientService) {
        this.a.lift('asd')
    }

    public getPeriod(start: Date, end: Date, sensors: Sensor[]): Observable<SensorData[]> {

        const periodHeaders = new Map<string, string>()
        periodHeaders.set('start', start.toISOString())
        periodHeaders.set('end', end.toISOString())

        const sensorsPost = sensors.map(s => {
            return {'sensorConnectChipId': s.sensorConnectChipId, 'sensorId': s.SensorNumber, 'channel': s.ChannelNumber };
        });

        return this.http.post<SensorData[]>('/metrics/combined', sensorsPost, periodHeaders)
            .map((response) => response.map(item => {
             return new SensorData().deserialize(item)
        }))
    }
}
