import { Deserializable } from '../deserializable.model';
import { TreeCloudConnect } from './treeCloudConnect.model';
import { Project } from '../project.model';

export class TreeProject implements Deserializable<TreeProject> {
    name: string;
    children: TreeCloudConnect[];

    id: number;

    deserialize(input: Project): TreeProject {
        Object.assign(this, input);

        this.children = new Array<TreeCloudConnect>();
        input.devices.forEach(element => {
            this.children.push(new TreeCloudConnect().deserialize(element));
        });

        this.id = input.id;
        return this;
    }

    getNumberOfSensors() {
        console.log('function from tree-projectModel: ');
    }
}
