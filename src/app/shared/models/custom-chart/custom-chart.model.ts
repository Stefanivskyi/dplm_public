import { Deserializable } from '../deserializable.model';
import { CustomSensor } from './custom-chart-sensor.model';
import { Sensor } from '../sensor.model';

export class CustomChart implements Deserializable<CustomChart> {
    name: string;
    sensors: CustomSensor[];
    standardSensors: Sensor[];

    getSensors(): Sensor[] {
        return this.sensors.map(s => {
            return new Sensor(s.sensorChipId, s.sensorId)});
    }

    deserialize(input: any): CustomChart {
        Object.assign(this, input);

        this.sensors = new Array<CustomSensor>();
        input.sensors.forEach(element => {
            this.sensors.push(new CustomSensor().deserialize(element));
        });

        this.standardSensors = this.getSensors();

        console.log('standard sensors' + this.standardSensors)

        return this;
    }
}

