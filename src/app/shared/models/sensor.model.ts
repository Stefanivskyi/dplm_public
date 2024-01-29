import { Deserializable } from './deserializable.model';
import Constants from '../../util/constants';

export class Sensor implements Deserializable<Sensor> {
    ChannelNumber: number;
    SensorNumber: number;
    CustomName: string;
    brand: string;
    name: string;
    sensorType: string;

    sensorConnectChipId: string;
    isSelected: boolean;

    // visualisation properties
    graphColor: string;

    constructor(sensorChipId: string, sensorId: number) {
        this.sensorConnectChipId = sensorChipId;
        this.SensorNumber = sensorId;
    }

    public getName(): string {
        return this.CustomName ? this.CustomName : 's' + this.SensorNumber;
    }

    deserialize(input: any): Sensor {
        Object.assign(this, input);

        // assign color
        this.graphColor = this.getSensorColor(this.SensorNumber);
        return this;
    }

    getSensorColor(sensorNumber: number): string {
        let number = sensorNumber;
        while (number > Constants.sensorColors.length) {
          number -= Constants.sensorColors.length;
        }

        return Constants.sensorColors[number];
      }

    getSensorCombinedId(): string {
        return this.sensorConnectChipId + '__' + this.SensorNumber + '__' + this.ChannelNumber;
    }
}
