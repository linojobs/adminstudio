import mysql from "mysql";

const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DB
});

export default class DB {
    async query(sql: string, params: Array<string | number | undefined> = []) {
        return new Promise<any>((resolve, reject) => {
            connectionPool.getConnection((err, connection) => {
                if (err) reject(err);
                connection.query({
                    sql,
                    timeout: 10000,
                    values: params
                }, (err, results, fields) => {
                    connection.release();
                    if (err) reject(err);
                    resolve(results);
                });
            });
        });
    }
}