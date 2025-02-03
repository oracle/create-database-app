import fs from 'node:fs';
import {
    afterEach,
    beforeAll,
    describe,
    expect,
    it
} from 'vitest';

import { CLI } from './cli.js';

const NEW_APP_PATH = 'generated/test-db-app';
const removeFolder = ( dirPath: string ) => {
    if ( fs.existsSync( dirPath ) ) {
        fs.rmSync( dirPath, { recursive: true } );
    }
};

describe( 'e2e tests', () => {
    // Cleanup previous test runs
    beforeAll( () => {
        removeFolder( NEW_APP_PATH );
    } );

    afterEach( () => {
        removeFolder( NEW_APP_PATH );
    } );

    it( 'should display the help menu', async() => {
        const { stdout } = await CLI.get( [ '--help' ] );

        expect( stdout ).toContain( 'USAGE' );
        expect( stdout ).toContain( 'ARGUMENTS' );
        expect( stdout ).toContain( 'FLAGS' );
        expect( stdout ).toContain( 'DESCRIPTION' );
        expect( stdout ).toContain( 'EXAMPLES' );
    } );

    it( 'should request the application\'s name', async() => {
        const { stdout } = await CLI.get( [], true );

        expect( stdout ).toContain( 'application\'s name' );
    } );

    it( 'should keep asking for application\'s name when none has been provided', async() => {
        const cli = new CLI();
        const { stdout } = await cli.userInput( [ '\n', '\n', '\n' ] );

        expect( stdout ).toContain( 'application\'s name' );
    } );

    it( 'should scaffold the project using flags', async() => {
        const cli = new CLI( [
            NEW_APP_PATH,
            '--template=node-vanilla',
            '--connection-type=basic',
            '--db-hostname=localhost',
            '--db-port=80',
            '--db-protocol=tcp',
            '--db-service-type=sid',
            '--db-sid=testSid',
            '--db-username=testUser'
        ] );
        const { stdout } = await cli.userInput( [ 'dummyPassword\n' ] );

        expect( fs.existsSync( NEW_APP_PATH ) ).toBeTruthy();
        expect( stdout ).toMatch( /added \d{1,5} packages/ );
    } );
} );
