const oracledb = require('oracledb');
const dbConfig = require('./config.cjs');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

class DBConnector {
    constructor() {
        this.pool = oracledb.createPool({
            ...dbConfig,
            poolMax: 10,
            poolMin: 10
        });
    }

    getConnection(options = {}) {
        const pool = oracledb.getPool();
        return pool.getConnection({
            ...dbConfig,
            ...options
        });
    }
}

module.exports = new DBConnector();
