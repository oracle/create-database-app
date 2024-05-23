/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
const db = require( '../db/index.cjs' );

exports.getStatus = async function () {
    await db.init();
    const connection = await db.getConnection();
    const result = await connection.execute( 'select 1 from dual' );
    await connection.close();

    return {
        status: 'ok',
    }
};