export class Product {
    id: number;
    name: string;
    description: string;
    dtCreate: Date;

    constructor() {
        this.dtCreate = new Date();
    }
}
