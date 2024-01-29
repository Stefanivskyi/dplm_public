import { Deserializable } from '../deserializable.model';

export class TreeSensor {

    CustomName: string;
    name: string;
    SensorNumber: number;

    deserialize(input: any): TreeSensor {
        Object.assign(this, input);
        return this;
    }
}
