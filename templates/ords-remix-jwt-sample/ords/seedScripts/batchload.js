/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import * as fs from 'node:fs/promises';
import path from 'node:path';

/*
  * Disabling no-console because this script intentionally prints
  * batch-style progress output for users.
*/
/* eslint-disable no-console */

const DATA_DIRECTORY = path.resolve('ords/data');
const CSV_DELIMITER = ',';
const DOUBLE_QUOTE = '"';
const ORA_TABLE_OR_VIEW_DOES_NOT_EXIST = 942;
const TABLES_TO_TRUNCATE = [
  'TICKET',
  'LIKED_EVENT',
  'LIKED_VENUE',
  'LIKED_MUSIC_GENRES',
  'LIKED_ARTIST',
  'ARTIST_CLASSIFICATIONS',
  'EVENTS',
  'VENUES',
  'CITIES',
  'EVENT_STATUS',
  'MUSIC_GENRES',
  'ARTISTS',
];

/**
 * Parses a CSV line, supporting quoted values.
 * @param {string} line the line to parse.
 * @returns {string[]} parsed CSV fields.
 */
function parseCsvLine(line) {
  const values = [];
  let currentValue = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === DOUBLE_QUOTE) {
      if (inQuotes && nextChar === DOUBLE_QUOTE) {
        currentValue += DOUBLE_QUOTE;
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === CSV_DELIMITER && !inQuotes) {
      values.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += char;
    }
  }

  values.push(currentValue.trim());
  return values;
}

/**
 * Loads and parses a CSV file from ords/data.
 * @param {string} fileName the CSV file name.
 * @returns {Promise<Array<Record<string, string>>>} parsed rows.
 */
async function loadCsvRows(fileName) {
  const filePath = path.join(DATA_DIRECTORY, fileName);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const lines = fileContents
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return [];
  }

  const headers = parseCsvLine(lines[0]).map((header) => header.trim().toUpperCase());
  return lines.slice(1).map((line) => {
    const fields = parseCsvLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = (fields[index] || '').trim();
    });
    return row;
  });
}

/**
 * Safely converts a CSV field to a number.
 * @param {string} value the raw CSV value.
 * @param {string} fieldName the field name for error context.
 * @returns {number} parsed number value.
 */
function toNumber(value, fieldName) {
  const parsedValue = Number.parseInt(value, 10);
  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid numeric value for ${fieldName}: "${value}"`);
  }
  return parsedValue;
}

/**
 * Prints ORDS batchload-like output block.
 * @param {number} rowsProcessed number of rows processed.
 * @param {number} rowsInError number of rows in error.
 * @param {number | null} committedRows rows committed in final batch.
 */
function printBatchOutput(rowsProcessed, rowsInError, committedRows) {
  console.log(`#INFO Number of rows processed: ${rowsProcessed}`);
  console.log(`#INFO Number of rows in error: ${rowsInError}`);
  if (committedRows === null) {
    console.log('#INFO No rows committed');
  } else {
    console.log(`#INFO Last row processed in final committed batch: ${committedRows}`);
  }
  if (rowsInError === 0) {
    console.log('SUCCESS: Processed without errors');
  } else {
    console.log('WARNING: Processed with errors');
  }
  console.log('');
}

/**
 * Executes insertMany for one table and prints optional batch output.
 * @param {import('oracledb').Connection} connection the schema connection.
 * @param {string} statement the INSERT statement.
 * @param {Array<import('oracledb').BindParameters>} binds bind rows.
 * @param {{showBatchOutput: boolean, committedRows: number | null, commitAfter: boolean}} options
 * execution options.
 */
async function runInsertBatch(connection, statement, binds, options) {
  const rowsProcessed = binds.length;
  let rowsInError = 0;

  if (rowsProcessed > 0) {
    const result = await connection.executeMany(statement, binds, { batchErrors: true });
    rowsInError = result.batchErrors?.length || 0;
  }

  if (options.commitAfter) {
    await connection.commit();
  }

  if (options.showBatchOutput) {
    printBatchOutput(rowsProcessed, rowsInError, options.committedRows);
  }
}

/**
 * Truncates known seed tables in dependency-safe order.
 * @param {import('oracledb').Connection} connection the schema connection.
 */
async function truncateSeedTables(connection) {
  await TABLES_TO_TRUNCATE.reduce(
    async (previousTruncate, tableName) => {
      await previousTruncate;
      try {
        await connection.execute(`TRUNCATE TABLE ${tableName}`);
      } catch (error) {
        if (error.errorNum !== ORA_TABLE_OR_VIEW_DOES_NOT_EXIST) {
          throw error;
        }
      }
    },
    Promise.resolve(),
  );
}

/**
 * Inserts and logs cities batch.
 * @param {import('oracledb').Connection} connection the schema connection.
 */
async function insertCities(connection) {
  const cityRows = await loadCsvRows('CITIES.csv');
  const binds = cityRows.map((row) => ({
    NAME: row.NAME,
    DESCRIPTION: row.DESCRIPTION,
  }));
  await runInsertBatch(
    connection,
    `INSERT INTO CITIES (NAME, DESCRIPTION)
     VALUES (:NAME, :DESCRIPTION)`,
    binds,
    {
      showBatchOutput: true,
      committedRows: null,
      commitAfter: false,
    },
  );
}

/**
 * Inserts and logs venues batch.
 * @param {import('oracledb').Connection} connection the schema connection.
 */
async function insertVenues(connection) {
  const venueRows = await loadCsvRows('VENUES.csv');
  const binds = venueRows.map((row) => ({
    NAME: row.NAME,
    LOCATION: row.LOCATION,
    CITY_ID: toNumber(row.CITY_ID, 'VENUES.CITY_ID'),
  }));
  await runInsertBatch(
    connection,
    `INSERT INTO VENUES (NAME, LOCATION, CITY_ID)
     VALUES (:NAME, :LOCATION, :CITY_ID)`,
    binds,
    {
      showBatchOutput: true,
      committedRows: null,
      commitAfter: false,
    },
  );
}

/**
 * Inserts and logs artists batch.
 * @param {import('oracledb').Connection} connection the schema connection.
 */
async function insertArtists(connection) {
  const artistRows = await loadCsvRows('ARTISTS.csv');
  const binds = artistRows.map((row) => ({
    NAME: row.NAME,
    DESCRIPTION: row.DESCRIPTION,
    BIO: row.BIO,
  }));
  await runInsertBatch(
    connection,
    `INSERT INTO ARTISTS (NAME, DESCRIPTION, BIO)
     VALUES (:NAME, :DESCRIPTION, :BIO)`,
    binds,
    {
      showBatchOutput: true,
      committedRows: null,
      commitAfter: false,
    },
  );
}

/**
 * Inserts and logs event status batch.
 * @param {import('oracledb').Connection} connection the schema connection.
 */
async function insertEventStatus(connection) {
  const eventStatusRows = await loadCsvRows('EVENT_STATUS.csv');
  const binds = eventStatusRows.map((row) => ({
    EVENT_STATUS_ID: toNumber(row.EVENT_STATUS_ID, 'EVENT_STATUS.EVENT_STATUS_ID'),
    EVENT_STATUS_NAME: row.EVENT_STATUS_NAME,
    EVENT_STATUS_DESCRIPTION: row.EVENT_STATUS_DESCRIPTION,
  }));
  await runInsertBatch(
    connection,
    `INSERT INTO EVENT_STATUS (EVENT_STATUS_ID, EVENT_STATUS_NAME, EVENT_STATUS_DESCRIPTION)
     VALUES (:EVENT_STATUS_ID, :EVENT_STATUS_NAME, :EVENT_STATUS_DESCRIPTION)`,
    binds,
    {
      showBatchOutput: true,
      committedRows: binds.length,
      commitAfter: true,
    },
  );
}

/**
 * Inserts and logs events batch.
 * @param {import('oracledb').Connection} connection the schema connection.
 */
async function insertEvents(connection) {
  const eventRows = await loadCsvRows('EVENTS.csv');
  const binds = eventRows.map((row) => ({
    EVENT_DATE: row.EVENT_DATE,
    ARTIST_ID: toNumber(row.ARTIST_ID, 'EVENTS.ARTIST_ID'),
    VENUE_ID: toNumber(row.VENUE_ID, 'EVENTS.VENUE_ID'),
    EVENT_STATUS_ID: toNumber(row.EVENT_STATUS_ID, 'EVENTS.EVENT_STATUS_ID'),
    EVENT_DETAILS: row.EVENT_DETAILS,
  }));
  await runInsertBatch(
    connection,
    `INSERT INTO EVENTS (EVENT_DATE, ARTIST_ID, VENUE_ID, EVENT_STATUS_ID, EVENT_DETAILS)
     VALUES (TO_DATE(:EVENT_DATE, 'YYYY-MM-DD'), :ARTIST_ID, :VENUE_ID, :EVENT_STATUS_ID, :EVENT_DETAILS)`,
    binds,
    {
      showBatchOutput: true,
      committedRows: binds.length,
      commitAfter: true,
    },
  );
}

/**
 * Inserts music genres without ORDS-style batch output.
 * @param {import('oracledb').Connection} connection the schema connection.
 */
async function insertMusicGenres(connection) {
  const musicGenreRows = await loadCsvRows('MUSIC_GENRES.csv');
  const binds = musicGenreRows.map((row) => ({
    NAME: row.NAME,
    DESCRIPTION: row.DESCRIPTION,
  }));
  await runInsertBatch(
    connection,
    `INSERT INTO MUSIC_GENRES (NAME, DESCRIPTION)
     VALUES (:NAME, :DESCRIPTION)`,
    binds,
    {
      showBatchOutput: false,
      committedRows: null,
      commitAfter: false,
    },
  );
}

/**
 * Inserts artist classifications without ORDS-style batch output.
 * @param {import('oracledb').Connection} connection the schema connection.
 */
async function insertArtistClassifications(connection) {
  const classificationRows = await loadCsvRows('ARTIST_CLASSIFICATIONS.csv');
  const binds = classificationRows.map((row) => ({
    ARTIST_ID: toNumber(row.ARTIST_ID, 'ARTIST_CLASSIFICATIONS.ARTIST_ID'),
    MUSIC_GENRE_ID: toNumber(row.MUSIC_GENRE_ID, 'ARTIST_CLASSIFICATIONS.MUSIC_GENRE_ID'),
  }));
  await runInsertBatch(
    connection,
    `INSERT INTO ARTIST_CLASSIFICATIONS (ARTIST_ID, MUSIC_GENRE_ID)
     VALUES (:ARTIST_ID, :MUSIC_GENRE_ID)`,
    binds,
    {
      showBatchOutput: false,
      committedRows: null,
      commitAfter: false,
    },
  );
}

/**
 * Populates schema objects with sample data using direct SQL.
 * @param {import('oracledb').Connection} connection the schema connection.
 */
async function populateObjects(connection) {
  await truncateSeedTables(connection);
  await insertCities(connection);
  await insertVenues(connection);
  await insertArtists(connection);
  await insertEventStatus(connection);
  await insertEvents(connection);

  await insertMusicGenres(connection);
  await insertArtistClassifications(connection);
  await connection.commit();
}

export default populateObjects;
