import { Deserializable } from './deserializable.model';
import { Sensor } from './sensor.model';
import { SensorConnectVersion } from './sensorConnectVersion.model';

export class SensorConnect implements Deserializable<SensorConnect> {

    name: string;
    sensorChipId: string;
    inputs: Sensor[];
    version: SensorConnectVersion;

    // returns number of channels supported by the SensorConnect
    getChannelsQuantity(): number {
        return this.version.channels;
    }

    deserialize(input: any): SensorConnect {
        Object.assign(this, input);

        this.inputs = new Array<Sensor>();
        input.inputs.forEach(element => {
            const sensor = new Sensor(null, null).deserialize(element);
            sensor.sensorConnectChipId = this.sensorChipId;

            this.inputs.push(sensor);
        });

        // console.log(this.version);
        return this;
    }
}
