/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

async function updateDatabaseStatus() {
  try {
      const lResponse = await fetch( './api/connection/status' );
      if ( !lResponse.ok ) throw new Error( `Unexpected server response. ${ lResponse.status }: ${ lResponse.statusText }` );
      const lJson = await lResponse.json();
      if ( lJson.status !== 'ok' ) throw new Error( `Unexpected database status "${ lJson.status }"` );

      return 'Database is working!';
  } catch ( error ) {
      console.error( 'Error fetching connection status:', error );
      return 'Something is wrong with the database!';
  }
}

export function Content() {
  let [ response, setResponse ] = useState<string>( 'Loading...' );
  useEffect( () => {
    updateDatabaseStatus()
      .then( pResponse => setResponse( pResponse ) );
  } , [] );

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content" style="display: flex;">

      <div style="margin: auto; text-align: center;">
        <a href="https://www.oracle.com/webfolder/technetwork/jet/index.html" rel="noopener noreferrer" target="_blank"><img alt="Oracle JET Logo" src="../../styles/images/oracle_jet_logo.png" /></a>
        <h1 id="response">{response}</h1>
        <div>Click on the icon to know more about Oracle JET</div>
      </div>

    </div>
  );
};
