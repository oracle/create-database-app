#!/usr/bin/env -S node --loader ts-node/esm --no-warnings=ExperimentalWarning

/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
// eslint-disable-next-line node/shebang
async function main () {
    const { execute } = await import( '@oclif/core' );
    await execute( { development: true, dir: import.meta.url } );
}

await main();