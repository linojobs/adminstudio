import DB from "../db";
import { RecordValue } from "./record";
import OrmTable from "./table";

export default class OrmFinder<Fields extends object> {
    private ormTable: OrmTable<Fields>;
    private start: number;
    private end: number;
    private orderBy: string;
    private whereParams:Partial<Fields>;
    constructor(ormTable: OrmTable<Fields>) {
        this.ormTable = ormTable;
        this.start = 0;
        this.end = 10;
        this.orderBy = "DESC";
        this.whereParams = {};
    }

    limit(start: number, end: number) {
        this.start = start;
        this.end = end;
        return this;
    }

    orderByAsc() {
        this.orderBy = "ASC";
        return this;
    }

    orderByDesc() {
        this.orderBy = "DESC";
        return this;
    }

    where(params:Partial<Fields>){
        this.whereParams = params;
        return this;
    }

    async fetchAll() {
        const whereFields = Object.keys(this.whereParams);
        const whereValues = Object.values<RecordValue>(this.whereParams);
        let where = "";
        if(whereFields.length != 0){
            where = "WHERE " + whereFields.map(x=>`${x}=?`).join("AND"); 
        }
        const db = new DB();
        const sql = `SELECT * FROM ${this.ormTable.tableName} ${where} ORDER BY ${this.ormTable.primaryKey} ${this.orderBy} LIMIT ?,?`;
        whereValues.push(this.start,this.end);
        const results = await db.query(sql,whereValues);
        return results;
    }
}