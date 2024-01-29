import { PairedSc } from './paired-sc.model';
import { Deserializable } from '../deserializable.model';

export class PairedCc {
    name: string;
    id: string;
    project: string;
    status: string;
    sensorConnect: number;
    sc: PairedSc[];

    deserialize(input: any): PairedCc {
        Object.assign(this, input);

        this.sc = new Array<PairedSc>();
        input.sc.forEach(element => {
            this.sc.push(new PairedSc().deserialize(element));
        });

        return this;
    }
}
