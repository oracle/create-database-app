/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { input, password, select } from '@inquirer/prompts';
import { Args, Command, Flags } from '@oclif/core';
import { exec } from 'node:child_process';
import fs, { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import untildify from 'untildify';

import { generateDatabaseApp } from '../generators/run-generator.js';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

/* eslint-disable perfectionist/sort-objects */

// The reason why we need extract-zip is because zlib doesn't support .zip formats and can only decompress 1 file rather than
// an archive. extract-zip seems to be the better option.
import extract from 'extract-zip';

let walletDirectory:string;
// For some reason, using createReadStream causes the inquirer to bug a bit.
// Function to retrieve the connection details from the ora file.
const retrieveConnectionStringDetailsFromORAFile = ( oraFilePath: string ) => {
    const data = fs.readFileSync( oraFilePath, 'utf8' );
    const protocol = data.slice( ( data.indexOf( 'protocol=' ) + 9 ), ( data.indexOf( ')(port' ) ) );
    const hostname = data.slice( ( data.indexOf( 'host=' ) + 5 ), ( data.indexOf( '))(' ) ) );
    const port = data.slice( ( data.indexOf( 'port=' ) + 5 ), ( data.indexOf( ')(host' ) ) );
    const serviceName = data.slice( ( data.indexOf( 'service_name=' ) + 13 ), ( data.indexOf( '))(security' ) ) );

    return { protocol, hostname, port, serviceName };
};

const generateConnectionString = ( protocol: string, hostname: string, port: string, serviceName: string ) => `${ protocol }://${ hostname }:${ port }/${ serviceName }`;

// Function to check if the supplied path is that of a Directory or a Zip file.
const checkIfDirectoryOrZip = ( directoryOrZip: string ) => {
    let isDirectoryOrZip = true;
    const resolvedPath = untildify( directoryOrZip );

    if ( resolvedPath.length === 0 ) {
        return 'This field cannot be empty!';
    }

    try {
        fs.accessSync( resolvedPath, constants.R_OK );
    } catch   {
        return 'WARNING: File access not permitted.';
    }

    if ( resolvedPath.slice( resolvedPath.trim().lastIndexOf( '.' ) ) === '.zip' ) {
        try {
            isDirectoryOrZip = fs.lstatSync( resolvedPath ).isFile();
        } catch ( error: any ) {
            return error.message;
        }
    } else {
        try {
            isDirectoryOrZip = fs.lstatSync( resolvedPath ).isDirectory();
            if ( fs.readdirSync( resolvedPath ).filter( file => file.includes( '.sso' ) ).length === 0 ) {
                return 'This is not a Wallet file, it does not contain the sso files!';
            }

            retrieveConnectionStringDetailsFromORAFile( path.join( resolvedPath, 'tnsnames.ora' ) );

        } catch ( error: any ) {
            return error.message;
        }
    }

    return isDirectoryOrZip;
};

const unzipWalletFile = async ( walletZip: string ) => {
    const downloadPath = path.normalize( walletZip );

    if ( downloadPath.slice( walletZip.lastIndexOf( '.' ) ) === '.zip' ) {
        try {
            const destination = path.normalize( path.join( walletDirectory, path.basename( walletZip, '.zip' ) ) );
            fs.mkdirSync( destination );
            await extract( downloadPath, { dir: destination } );
        } catch ( error ) {
            console.log( error );
            return false;
        }

        return true;
    }

    return false;
};

// Function to get the wallets that are within the wallet directory (/database)
const getWalletFiles = async ( givenPath?: string ) => {

    const walletFiles: string[] = [];

    if ( !givenPath ) return;

    const downloadPath = path.normalize( givenPath );

    if ( await unzipWalletFile( downloadPath ) ) {

        walletFiles.push( downloadPath );

    } else if ( checkIfDirectoryOrZip( givenPath ) ) {
        fs.readdirSync( givenPath ).some( file => {

            if ( file.slice( file.lastIndexOf( '.' ) ) === '.sso' ) {
                walletFiles.push( givenPath );
                return true;
            }

            return false;
        } );
    }

    return walletFiles;
};

// Create the wallet directory (/database) in the working directory where the process was invoked.
const createWalletDirectory = ( walletDirectoryPath: string ) => {
    const walletDestination = path.normalize( path.join( '.', 'database' ) );
    if ( !fs.existsSync( walletDestination ) ) fs.mkdirSync( walletDestination );

    const pasteDirectory = path.normalize( path.join( walletDestination, path.basename( walletDirectoryPath, '.zip' ) ) );

    try {
        // Check if we have read access to the supplied path
        fs.accessSync( walletDirectoryPath, constants.R_OK );
    } catch   {
        console.log( '\u001B[33m%s\u001B[0m', `WARNING: ${ walletDirectoryPath } File access not permitted. We couldn't copy the wallet file into the projects folder. Please run the following command to do so: \n cp ${ walletDirectoryPath } ./<YOUR_PROJECT>/utils/db/<WALLET_UNZIPPED_FOLDER> ` );
    }

    // If it's a zip file, the we unzip it.
    if ( walletDirectoryPath.includes( '.zip' ) ) {
        unzipWalletFile( walletDirectoryPath );
    } else {
        // Otherwise, it's the unzipped wallet directory, since we already check whether sso files are inside of the directory first.
        fs.mkdirSync( pasteDirectory );
        fs.cpSync( walletDirectoryPath, pasteDirectory, { recursive: true } );
    }

    return path.join( walletDestination, path.basename( walletDirectoryPath, '.zip' ) );
};

type Choice = {
    name: string,
    value: string,
};

// In the case where there's multiple wallets in the wallet directory, this function creates the choices that are needed
// by inquirer so that the user can pick which wallet to use.
const getWalletFileChoices = async () => {

    const wallets = await getWalletFiles();
    if ( wallets === undefined ) return [];

    const choices: Choice[] = [];
    for ( const wallet of wallets ) {
        choices.push( {
            name: wallet,
            value: path.normalize( path.join( '/database', wallet ) ),
        } );
    } 

    return choices;
};


// Here we promisify the exec function from child_process to use it with async/await
const execAsync = promisify( exec );
export default class Generate extends Command {
    static args = {
        file: Args.string( { description: 'file to read' } ),
    };

    static description = 'generate template';

    static examples = [
        '<%= config.bin %> <%= command.id %>',
    ];

    static flags = {
        // flag with a value (-n, --name=VALUE)
        name: Flags.string( { char: 'n', description: 'name to print' } ),
        // // flag with no value (-f, --force)
        // force: Flags.boolean({char: 'f'}),
        // // flag with no value (-t, --template)
        template: Flags.string( { char: 't', description: 'Template name' } ),
    };

    public async run (): Promise<void> {
        const { args, flags } = await this.parse( Generate );
        const name = flags.name ? flags.name : '';
        const template = flags.template ? flags.template : '';

        // Ask the user for the application name.
        const appName = name === '' ? await input(
            {
                message: 'What would you like your application\'s name to be?',
                validate ( input ) {
                    return /^([\w\\-])+$/.test( input ) ? true : 'Project name may only include letters, numbers, underscores and hashes.';
                },
            },
        ) : name;

        // Ask the user to choose the template that he wants.
        const templateChoice = template === '' ? await select(
            {
                message: 'Which template would you like to use for your project?',
                choices: [
                    {
                        name: 'node-vanilla',
                        value: 'node-vanilla',
                        description: 'This creates an empty vanilla javascript project and Oracle database connection starter code.',
                    },
                    {
                        name: 'node-react',
                        value: 'node-react',
                        description: 'This creates an empty project with React and Oracle database connection starter code.',
                    },
                    {
                        name: 'node-vue',
                        value: 'node-vue',
                        description: 'This creates an empty project with Vue and Oracle database connection starter code.',
                    },
                    {
                        name: 'node-jet',
                        value: 'node-jet',
                        description: 'This creates an empty project with Oracle JET and Oracle database connection starter code.',
                    },
                    {
                        name: 'node-angular',
                        value: 'node-angular',
                        description: 'This creates an empty project with Angular and Oracle database connection starter code.',
                    },
                    {
                        name: 'node-react-todo',
                        value: 'node-react-todo',
                        description: 'This creates a simple Todo app made with ExpressJS as the backend, React as the frontend, and an Oracle Database connection that will be created from the details you provide later...',
                    },
                ],
                default: 'node-vanilla'
            },
        ) : template;

        // Ask the user for the database connection type (Either basic connection or a connection using a cloud wallet).
        const databaseConnectionType = await select(
            {
                message: 'Which database connection type would you like to choose?',
                choices: [
                    {
                        name: 'Cloud Wallet Path',
                        value: 'walletPath'
                    },
                    {
                        name: 'Basic Connection (Protocol, Hostname, Port, Service Name / SID)',
                        value: 'basic',
                    },
                ],
                default: 'walletPath'
            }
        );

        // This represents the config object that will hold all the information that the user has inputted and selected.
        let configObject;

        // If the user has chosen the basic connection type, then we ask for the protocol, hostname, port and service name / SID.
        if ( databaseConnectionType === 'basic' ) {

            const protocol = await input(
                {
                    message: 'What is your database protocol?',
                    default: 'tcp'
                },
            );

            const hostname = await input(
                {
                    message: 'What is your database hostname?',
                    default: 'localhost'
                },
            );

            const port = await input(
                {
                    message: 'What is your database port?',
                    validate ( input ) {
                        return !isNaN( Number.parseInt( input ) ) && isFinite( Number.parseInt( input ) ) ? true : 'Port can only be numbers!';
                    },
                    default: '1521'
                },
            );

            const serviceType = await select(
                {
                    message: 'Which service type would you like to use?',
                    choices: [
                        {
                            name: 'SID',
                            value: 'sid',
                        },
                        {
                            name: 'Service name',
                            value: 'serviceName'
                        }
                    ]
                }
            );

            let serviceValue;

            serviceValue = await (
                serviceType === 'sid'
                    ? input(
                        {
                            message: 'Please input your database SID: ',
                            validate ( input ) {
                                return input.trim().length === 0 ? 'This field cannot be empty!' : true;
                            }
                        }
                    )
                    : input(
                        {
                            message: 'Please input your database service name: ',
                            validate ( input ) {
                                return input.trim().length === 0 ? 'This field cannot be empty!' : true;
                            }
                        }
                    ) );

            // This will be config object for the basic connection type.
            configObject = {
                appName,
                templateChoice: path.resolve( path.join( __dirname, '..', '..', 'templates', templateChoice ) ),
                connectionString: generateConnectionString( protocol, hostname, port, serviceValue )
            };
        } else {
            let walletPath;

            console.log( '\u001B[33m%s\u001B[0m', 'In order to unzip and copy the Wallet file, please ensure that the read permissions have been given to the terminal. \n' );

            walletPath = await input(
                {
                    // TODO: Cannot use tab to autocomplete, cannot use ~ for $HOME
                    message: 'Please input your Cloud Wallet Path:',
                    validate ( input ) {
                        return checkIfDirectoryOrZip( input );
                    }
                }
            );

            // walletPath = createWalletDirectory( walletPath );
            walletPath = path.resolve( untildify( walletPath ) );
            walletDirectory = path.dirname( walletPath );

            const walletPassword = await password(
                {
                    mask: true,
                    message: 'Please input your wallet password:',
                    validate ( input ) {
                        return input.trim().length === 0 ? 'This field cannot be empty!' : true;
                    }
                }
            );


            // This is the config object that represents the wallet connection type.
            configObject = {
                appName,
                templateChoice: path.resolve( path.join( __dirname, '..', '..', 'templates', templateChoice ) ),
                walletPath,
                walletPassword,
            };
        }

        // Ask the user for the database connection username.
        Object.assign( configObject, {
            connectionUsername: await input(
                {
                    message: 'What\'s your database username?',
                    validate ( input ) {
                        return input.trim().length === 0 ? 'This field cannot be empty!' : true;
                    }
                },
            )
        } );

        // Ask the user for the database connection password.
        Object.assign( configObject, {
            connectionPassword: await password(
                {
                    mask: true,
                    message: 'What\'s your database password?',
                    validate ( input ) {
                        return input.trim().length === 0 ? 'This field cannot be empty!' : true;
                    }
                },
            )
        } );

        generateDatabaseApp( configObject );
        // TODO: This is the object that holds the application name, template choice, connection details depending on the chosen connection type.
        // console.log( JSON.stringify( configObject, null, ' ' ) );
        // const emptyReactPath = path.join( 'src', 'templates', 'empty-templates', 'empty-react-app' );
        // const emptyVanillaPath = path.join( 'src', 'templates', 'empty-templates', 'empty-vanilla-js-app' );
        // const emptyVuePath = path.join( 'src', 'templates', 'empty-templates', 'empty-vue-app' );
        // const reactToDoApp = path.join( 'src', 'templates', 'node-react-todo' );
        //
        //
        // switch ( templateChoice ) {
        //     case 'node-react':
        //         await this.runNodeAppProject( emptyReactPath );
        //         break;
        //     case 'node-vue':
        //         await this.runNodeAppProject( emptyVuePath );
        //         break;
        //     case 'node-vanilla':
        //         await this.runNodeAppProject( emptyVanillaPath );
        //         break;
        //     case 'node-react-todo':
        //         await this.runNodeAppProject( reactToDoApp );
        //         break;
        //
        //     default:
        //         this.runNodeAppProject( emptyReactPath );
        //
        // }

    }

    private async runNodeAppProject ( projectPath: string ): Promise<void> {
        try {
            const serverPath = path.join( 'src', 'templates', 'app' );
            // First install dependencies and run the server
            this.log( `Installing server dependencies in ${ serverPath }...` );
            await execAsync( 'npm install', { cwd: serverPath } );
            this.log( `Starting server in ${ serverPath }...` );
            const serverProcess = exec( 'node index.js', { cwd: serverPath } );

            serverProcess.stdout?.on( 'data', ( data ) => {
                this.log( `Server: ${ data }` );
            } );

            serverProcess.stderr?.on( 'data', ( data ) => {
                this.error( `Server Error: ${ data }` );
            } );
            this.log( `Starting Node.js React app in ${ projectPath }...` );
            this.log( `Installing client side dependencies in ${ projectPath }...` );
            // check if we need to install dependencies
            const shouldInstall = !fs.existsSync( `${ projectPath }/node_modules` ) ||
                !fs.existsSync( `${ projectPath }/package-lock.json` );

            if ( shouldInstall ) {
                this.log( 'Installing dependencies...' );
                await execAsync( 'npm install', { cwd: projectPath } );
            }

            this.log( 'running...' );
            const client = exec( 'npm run dev', { cwd: projectPath } );
            client.stdout?.on( 'data', ( data ) => {
                this.log( `client: ${ data }` );
            } );
            client.stderr?.on( 'data', ( data ) => {
                this.error( `client Error: ${ data }` );
            } );



        } catch ( error ) {
            this.error( `Error running the Node.js React app: ${ error }` );
        }
    }
}
