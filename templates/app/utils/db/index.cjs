/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/

// app/server/utils/db/config.cjs
const oracledb = require('oracledb');
const dbConfig = require('./config.cjs');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

class DBConnector {
    constructor() {
        this.pool = null;
    }

    async createPool() {
        if (!this.pool) {
            try {
                this.pool = await oracledb.createPool({
                    ...dbConfig,
                    poolMax: 10,
                    poolMin: 10
                });
                console.log('Connection pool created successfully.');
            } catch (error) {
                console.error('Error creating connection pool:', error);
                throw error;
            }
        }
    }

    async getConnection(options = {}) {
        await this.createPool();
        try {
            const connection = await this.pool.getConnection({
                ...dbConfig,
                ...options
            });
            return connection;
        } catch (error) {
            console.error('Error getting connection:', error);
            throw error;
        }
    }
}

module.exports = new DBConnector();
