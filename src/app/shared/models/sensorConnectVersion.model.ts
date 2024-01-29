import { Deserializable } from './deserializable.model';

export class SensorConnectVersion implements Deserializable<SensorConnectVersion> {

    channels: number;
    scVersion: number;
    sensorPerChannel: number;

    deserialize(input: any): SensorConnectVersion {
        Object.assign(this, input);

        return this;
    }
}
