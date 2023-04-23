import DB from "../db";
import OrmTable from "./table";

export default class OrmFinder<Fields extends object> {
    private ormTable: OrmTable<Fields>;
    private start: number;
    private end: number;
    private orderBy: string;
    constructor(ormTable: OrmTable<Fields>) {
        this.ormTable = ormTable;
        this.start = 0;
        this.end = 10;
        this.orderBy = "DESC";
    }

    limit(start: number, end: number) {
        this.start = start;
        this.end = end;
    }

    orderByAsc() {
        this.orderBy = "ASC";
    }

    orderByDesc() {
        this.orderBy = "DESC";
    }

    async fetchAll() {
        const db = new DB();
        const sql = `SELECT * FROM ${this.ormTable.tableName} 
        ORDER BY ${this.ormTable.primaryKey} ${this.orderBy} 
        LIMIT ${this.start},${this.end}`;
        const results = await db.query(sql);
        return results;
    }
}