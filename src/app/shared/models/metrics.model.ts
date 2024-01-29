import { Deserializable } from './deserializable.model';

export class MetricsModel implements Deserializable<MetricsModel> {
    s: number;
    dateTime: Date;

    deserialize(input: any): MetricsModel {
        Object.assign(this, input);
        return this;
    }
}

