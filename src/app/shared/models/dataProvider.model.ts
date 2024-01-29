import { Sensor } from '../../shared/models/sensor.model';

export class DataProviderModel {
    constructor(public sensors: Sensor[], public metrics: any[]) {
    }
}
