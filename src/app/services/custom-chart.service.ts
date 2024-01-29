import { Injectable } from '@angular/core';
import { HttpClientService } from '../asyncServices/http-client.service';
import { Sensor } from '../shared/models/sensor.model'
import { CustomChart } from '../shared/models/custom-chart/custom-chart.model';
import { Observable } from 'rxjs';
import { SensorConnect } from '../shared/models/sensorConnect.model';
import { CustomSensor } from '../shared/models/custom-chart/custom-chart-sensor.model';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomChartService {

    private sensorChipId = '';
    private sensorId: number;
    private sensorArray = []
    constructor(private http: HttpClientService) {

    }
    saveCustomChart(name: string, sensors: Sensor[]): Observable<any> {
    sensors.forEach(s => {
        this.sensorChipId = s.sensorConnectChipId
        this.sensorId = s.SensorNumber

    this.sensorArray.push({
         'sensorChipId': this.sensorChipId,
         'sensorId': this.sensorId,
          'colorIndex': 0,
          'active': true
    })})


        const body = {
            'name': name,
            'sensors': this.sensorArray
        }
        return this.http.post<CustomChart[]>('/hardware/charts', body).map(response => response.map(item => {
            return new CustomChart().deserialize(item)
        }))
    }

    getCustomChart(params): Observable<CustomChart[]> {
        return this.http.get<CustomChart[]>('/hardware/charts/' + params).map(response => response.map(item => {
                return new CustomChart().deserialize(item);
            }))
    }

    deleteCustomChart(chartName): Observable<any> {

        return this.http.delete<CustomChart[]>('/hardware/charts/' + chartName, chartName)
    }
}
