/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
const db = require('../db/index.cjs');

exports.getTasks = async function () {
    const connection = await db.getConnection();

    const sql = `
SELECT 
    TASKS.*,
    TASKS.ID AS "$self"
FROM
    TASKS
ORDER BY 
    ID DESC
`;
    const result = connection.execute(sql, {});

    await connection.close();

    return result;
}

exports.getTaskById = async function (binds) {
    const connection = await db.getConnection();

    const sql = `
SELECT
    TASKS.*
FROM
    TASKS
WHERE
    ID = :id
`;

    const result = connection.execute(sql, binds);

    await connection.close();

    return result;
}

exports.saveTask = async function (binds) {
    const connection = await db.getConnection();

    const sql = `
INSERT INTO TASKS(
    NAME
) VALUES (
    :name
)
`;

    const result = connection.execute(sql, binds);

    await connection.close();

    return result;
}

exports.updateTask = async function (binds) {
    const connection = await db.getConnection();

    let sql;

    if (!binds.name) {
        sql = `
        UPDATE TASKS
        SET
            IS_COMPLETED = :is_completed
        WHERE
            ID = :id
        `;
    } else if (!binds.is_completed) {
        sql = `
        UPDATE TASKS
        SET
            NAME = :name
        WHERE
            ID = :id
        `;
    } else {
        sql = `
        UPDATE TASKS
        SET
            NAME = :name,
            IS_COMPLETED = :is_completed
        WHERE
            ID = :id
        `;
    }

    const result = connection.execute(sql, binds);

    await connection.close();

    return result;
}

exports.deleteTask = async function (binds) {
    const connection = await db.getConnection();

    const sql = `
DELETE FROM TASKS
WHERE
    ID = :id
`;

    const result = connection.execute(sql, binds);

    await connection.close();

    return result;
}
