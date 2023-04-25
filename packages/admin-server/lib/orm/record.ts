import DB from "../db";
import OrmTable from "./table";

export type RecordValue = string | number | undefined;

export default class OrmRecord<Fields extends object> {

    private ormTable: OrmTable<Fields>;

    private values: Partial<Record<keyof Fields, RecordValue>>;

    private dirty_values: Partial<Record<keyof Fields, RecordValue>>;

    constructor(ormTable: OrmTable<Fields>,initialValues:Partial<Fields>) {
        this.ormTable = ormTable;
        this.values = initialValues;
        this.dirty_values = {};
    }

    set(field: keyof Fields, value: RecordValue) {
        this.dirty_values[field] = value;
        return this;
    }

    get(field: keyof Fields) {
        if (Object.prototype.hasOwnProperty.call(this.dirty_values, field)) {
            return this.dirty_values[field];
        }
        if (Object.prototype.hasOwnProperty.call(this.values, field)) {
            return this.values[field];
        }
        return undefined;
    }

    async save() {
        const id = this.get(this.ormTable.primaryKey as keyof Fields);
        if (id === undefined) {
            return this.insert();
        } else {
            return this.update();
        }
    }

    async insert() {
        const db = new DB();
        const fields = Object.keys(this.dirty_values) as Array<keyof Fields>;
        const sfields = fields.join(",");
        const holders = fields.map(field => "?").join(",");
        const values: Array<RecordValue> = fields.map((field) => this.dirty_values[field]);
        const sql = `INSERT INTO ${this.ormTable.tableName}(${sfields})values(${holders})`;
        const result = await db.query(sql, values);
        this.set(this.ormTable.primaryKey as keyof Fields, result.insertId)
        return result;
    }

    async update() {
        const id = this.get(this.ormTable.primaryKey as keyof Fields);
        const db = new DB();
        const fields = Object.keys(this.dirty_values) as Array<keyof Fields>;;
        const holders = fields.map(field => `${String(field)}=?`).join(",");
        const values: Array<RecordValue> = fields.map(field => this.dirty_values[field]);
        values.push(id);
        const sql = `UPDATE ${this.ormTable.tableName} SET ${holders} WHERE ${this.ormTable.primaryKey}=?`;
        const result = await db.query(sql, values);
        return result;
    }

}