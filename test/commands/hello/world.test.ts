/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { runCommand } from '@oclif/test';
import { expect } from 'chai';

describe( 'hello world', () => {
    it( 'runs hello world cmd', async() => {
        const { stdout } = await runCommand< { name: string } >( [ 'hello:world' ] );
        expect( stdout ).to.contain( 'hello world!' );
    } );
} );
