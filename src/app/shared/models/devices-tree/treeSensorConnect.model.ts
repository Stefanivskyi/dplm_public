import { Deserializable } from '../deserializable.model';
import { TreeSensor } from './treeSensor.model';

export class TreeSensorConnect {
    name: string;
    children: TreeSensor[];

    deserialize(input: any): TreeSensorConnect {
        Object.assign(this, input);

        this.children = new Array<TreeSensor>();
        input.inputs.forEach(element => {
            const newElement = new TreeSensor().deserialize(element);
            newElement.name = element.CustomName;

            if (!newElement.name) {
                newElement.name = 's' + newElement.SensorNumber;
            }

            this.children.push(newElement);
        });

        return this;
    }
}
