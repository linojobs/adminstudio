import OrmFinder from "./finder";
import OrmRecord from "./record";

export default class OrmTable<Fields extends object> {

    private table: string;
    private primary_key: string;

    constructor(table: string, primaryKey: string) {
        this.table = table;
        this.primary_key = primaryKey;
    }


    public get tableName(): string {
        return this.table;
    }


    public get primaryKey(): string {
        return this.primary_key;
    }


    record(initialValues:Partial<Fields>) {
        return new OrmRecord<Fields>(this,initialValues);
    }

    finder() {
        return new OrmFinder<Fields>(this);
    }

}