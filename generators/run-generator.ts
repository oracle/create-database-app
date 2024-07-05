/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import yoenv from 'yeoman-environment';

// import DatabaseAppGenerator from './generators/app/index.js';
import DatabaseAppGenerator from './index.js';

const generatorEnvironment = yoenv.createEnv();
generatorEnvironment.registerStub( DatabaseAppGenerator, 'database-app' );

export function generateDatabaseApp( opts: Record<string, string> ) {
    generatorEnvironment.run( 'database-app', opts );
}
