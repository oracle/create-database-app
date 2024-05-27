/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import extract from 'extract-zip';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Generator from 'yeoman-generator';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

const retrieveConnectionStringDetailsFromORAFile = ( oraFilePath: string ) => {
    const data = fs.readFileSync( oraFilePath, 'utf8' );
    const protocol = data.slice( ( data.indexOf( 'protocol=' ) + 9 ), ( data.indexOf( ')(port' ) ) );
    const hostname = data.slice( ( data.indexOf( 'host=' ) + 5 ), ( data.indexOf( '))(' ) ) );
    const port = data.slice( ( data.indexOf( 'port=' ) + 5 ), ( data.indexOf( ')(host' ) ) );
    const serviceName = data.slice( ( data.indexOf( 'service_name=' ) + 13 ), ( data.indexOf( '))(security' ) ) );

    return { protocol, hostname, port, serviceName };
};

const generateConnectionString = ( protocol: string, hostname: string, port: string, serviceName: string ) => `${ protocol }://${ hostname }:${ port }/${ serviceName }`;

export default class extends Generator {
    constructor( args: string|string[], opts: Record<string,string> ) {
        super( args, opts, {
            customInstallTask: true
        } );
        this.sourceRoot( path.join( __dirname, '../templates' ) );
        this.options = {
            ...opts,
            apiConfiguration: opts.templateChoice.includes( 'todo' ) ? 'tasks': 'connection',
        };

        // this.env.options.nodePackageManager = 'npm';
        // this.env.options.cwd = path.join( process.cwd(), this.options.appName );
    }

    install() {
        this.spawnCommandSync( 'npm', [ 'install' ], {
            cwd: path.join( process.cwd(), this.options.appName )
        } );

        let lRevParseResult;

        try {
            lRevParseResult = this.spawnCommandSync( 'git', [ 'rev-parse', '--git-dir' ], {
                cwd: path.join( process.cwd(), this.options.appName ),
                stdio: 'pipe',
            } );
        } catch( pError ) {
            lRevParseResult = pError;
        }

        if ( lRevParseResult.failed ) {
            this.spawnCommandSync( 'git', [ 'init' ], {
                cwd: path.join( process.cwd(), this.options.appName )
            } );
        } else {
            this.log( `Directory is already inside of the git repository "${ lRevParseResult.stdout }". Skipping "git init"` );
        }
    }

    path() {
        this.destinationRoot( path.join( process.cwd(), this.options.appName ) );
    }

    welcome() {
        this.log( 'Generating database app...' );
    }

    // copy the files in the templates/app folder to the root of appname
    async writing() {
        if ( !( 'connectionString' in this.options ) && ( 'walletPath' in this.options ) ) {
            const walletPath = path.join( process.cwd(), this.options.appName, 'server', 'utils', 'db', 'wallet' );
            if ( this.options.walletPath.endsWith( '.zip' ) ) {
                await extract( this.options.walletPath, {
                    dir: walletPath
                } );
            } else {
                fs.cpSync(
                    this.options.walletPath,
                    walletPath,
                    { recursive: true }
                );
            }
            
            const { protocol, hostname, port, serviceName } = retrieveConnectionStringDetailsFromORAFile( path.join( walletPath, 'tnsnames.ora' ) );
            this.options.connectionString = generateConnectionString( protocol, hostname, port, serviceName );
        }

        this.fs.copyTpl(
            this.templatePath( this.options.templateChoice ),
            this.destinationPath(),
            {
                appName: this.options.appName
            }
        );
        this.fs.copy(
            this.templatePath( `${this.options.templateChoice}/.gitignore.template` ),
            this.destinationPath( '.gitignore' ),
        );
        this.fs.copy(
            this.templatePath( `${this.options.templateChoice}/.eslintrc.cjs` ),
            this.destinationPath( '.eslintrc.cjs' ),
        );
        this.fs.copy(
            this.templatePath(`${ path.dirname( this.options.templateChoice ) }/app/.github`),
            this.destinationPath('.github')
        )
        this.fs.copyTpl(
            this.templatePath( `${ path.dirname( this.options.templateChoice ) }/app/${ path.basename( this.options.templateChoice ) == 'node-jet' ? 'index-proxied' : 'index' }.cjs` ),
            this.destinationPath( 'server/index.cjs' ),
            this.options
        );
        this.fs.copy(
            this.templatePath( `${ path.dirname( this.options.templateChoice ) }/app/routes/${this.options.apiConfiguration}.cjs` ),
            this.destinationPath( `server/routes/${this.options.apiConfiguration}.cjs` ),
        );
        this.fs.copy(
            this.templatePath( `${ path.dirname( this.options.templateChoice ) }/app/utils/db/**/*` ),
            this.destinationPath( 'server/utils/db/' ),
        );
        this.fs.copy(
            this.templatePath( `${ path.dirname( this.options.templateChoice ) }/app/utils/rest-services/${this.options.apiConfiguration}.cjs` ),
            this.destinationPath( `server/utils/rest-services/${this.options.apiConfiguration}.cjs` ),
        );
        this.fs.copyTpl(
            this.templatePath( `${ path.dirname( this.options.templateChoice ) }/app/.env.example` ),
            this.destinationPath( '.env.example' ),
            {
                appName: '',
                connectionPassword: '',
                connectionString: '',
                connectionUsername: '',
                walletPassword: '',
                walletPath: '',
            }
        );
        this.fs.copyTpl(
            this.templatePath( `${ path.dirname( this.options.templateChoice ) }/app/.env.example.${ ( 'walletPath' in this.options ) ? 'cloud-wallet' : 'basic' }` ),
            this.destinationPath( '.env' ),
            this.options
        );
    }

    end() {
        this.log( 'Application generated successfuly. Run the following command: \n\ncd ' + path.join( process.cwd(), this.options.appName ) + '\n');
    }
}
