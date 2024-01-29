import { Deserializable } from './deserializable.model';
import { MetricsModel } from './metrics.model';

export class SensorData implements Deserializable<SensorData>  {
    sensorConnectChipId: string;
    sensorId: number;
    channel: number;
    metrics: MetricsModel[];

    deserialize(input: any): SensorData {
        Object.assign(this, input);

        this.metrics = new Array<MetricsModel>();
        input.metrics.forEach(element => {
            this.metrics.push(new MetricsModel().deserialize(element))
        });

        return this;
    }
}
