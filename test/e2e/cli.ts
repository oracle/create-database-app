import {
    ResultPromise,
    execa
} from 'execa';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
const CLI_PATH = path.join( __dirname, '../../bin/run.js' );

const WAIT_TIME = 500;

/**
 * Wrapper class to simplify the CLI testing and simulating User interactions
 */
export class CLI {
    private cliInstance: ResultPromise;

    /**
     * Constructor of the CLI with an execa instance (this.cliInstance)
     * @param {string[]} flags list of flags to initialize the CLI
     * @param {boolean} endPipe whether to end the CLI pipe or not
     */
    constructor( flags: string[] = [], endPipe: boolean = false ) {
        this.cliInstance = CLI.get( flags, endPipe );
    }

    /**
     * static method to retrieve a new execa CLI Instance
     * @param {string[]} flags list of flags to initialize the CLI
     * @param {boolean} endPipe whether to end the CLI pipe or not
     * @returns {ResultPromise}
     */
    static get( flags: string[] = [], endPipe: boolean = false ): ResultPromise {
        const args = [ CLI_PATH ];

        if ( flags.length > 0 ) {
            args.push( ...flags );
        }

        const cliInstance = execa( 'node', args, { stdio: 'pipe' } );

        if ( endPipe ) {
            setTimeout( () => {
                cliInstance.stdin?.end();
            }, WAIT_TIME );
        }

        return cliInstance;
    }

    /**
     * Get the internal CLI Instance
     * @returns {ResultPromise}
     */
    public getCli(): ResultPromise {
        return this.cliInstance;
    }

    /**
     * Simulate user input
     * @param {string[]} actions list of user input
     * @returns {ResultPromise}
     */
    public userInput( actions: string[] ): ResultPromise {
        setTimeout( () => {
            if ( actions.length === 0 ) {
                this.cliInstance.stdin?.end();
            } else {
                this.cliInstance.stdin?.write( actions.shift() );
                this.userInput( actions );
            }
        }, WAIT_TIME );

        return this.cliInstance;
    }
}
