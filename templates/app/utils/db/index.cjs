/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
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
