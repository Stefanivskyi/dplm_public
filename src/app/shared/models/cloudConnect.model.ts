import { Deserializable } from './deserializable.model';
import { SensorConnect } from './sensorConnect.model';

export class CloudConnect implements Deserializable<CloudConnect> {
    name: string;
    chipId: string;
    description: string;
    id: number;
    sensorConnects: SensorConnect[];

    deserialize(input: any): CloudConnect {
        Object.assign(this, input);

        this.sensorConnects = new Array<SensorConnect>();
        input.sensorConnects.forEach(element => {
            this.sensorConnects.push(new SensorConnect().deserialize(element));
        });

        return this;
    }
}
