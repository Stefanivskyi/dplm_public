import { Deserializable } from './../deserializable.model';

export class PairedSc {

    name: string;
    id: string;

    deserialize(input: any): PairedSc {
        Object.assign(this, input);
        return this;
    }
}
