#!/usr/bin/env node

/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
async function main() {
    const { execute } = await import( '@oclif/core' );
    await execute( { dir: import.meta.url } );
}

await main();
