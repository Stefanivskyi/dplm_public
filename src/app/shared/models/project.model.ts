import { Deserializable } from './deserializable.model';
import { CloudConnect } from './cloudConnect.model';

export class Project implements Deserializable<Project> {
    name: string;
    address: string;
    description: string;
    url: string;
    id: number;
    devices: CloudConnect[];

    deserialize(input: any): Project {
        Object.assign(this, input);

        this.devices = new Array<CloudConnect>();
        input.devices.forEach(element => {
            this.devices.push(new CloudConnect().deserialize(element));
        });

        return this;
    }

    getNumberOfSensors() {
        // console.log('calculate number of sensors for project: ' + name);
        let sensors: number;
        sensors = 0;

        this.devices.forEach(device => {
            device.sensorConnects.forEach(sc => {
                sensors += sc.inputs.length;
            });
        });

        return sensors;
    }
}
