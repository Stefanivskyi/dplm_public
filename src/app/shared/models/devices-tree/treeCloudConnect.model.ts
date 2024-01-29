import { CloudConnect } from './../cloudConnect.model';
import { Deserializable } from '../deserializable.model';
import { TreeSensorConnect } from './treeSensorConnect.model';

export class TreeCloudConnect implements Deserializable<TreeCloudConnect> {
    name: string;
    children: TreeSensorConnect[];

    ccId: number;

    deserialize(input: CloudConnect): TreeCloudConnect {
        Object.assign(this, input);

        this.children = new Array<TreeSensorConnect>();
        input.sensorConnects.forEach(element => {
            this.children.push(new TreeSensorConnect().deserialize(element));
        });

        this.ccId = input.id;

        return this;
    }
}
