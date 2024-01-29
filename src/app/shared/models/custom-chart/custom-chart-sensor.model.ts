import { Deserializable } from '../deserializable.model';

export class CustomSensor implements Deserializable<CustomSensor> {
    sensorChipId: string;
    sensorId: number;
    active: boolean
    colorIndex: number
    customName: string

    deserialize(input: any): CustomSensor {
        Object.assign(this, input);
        return this;
    }
}
