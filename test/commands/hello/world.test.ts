/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { expect, test } from '@oclif/test';

describe( 'hello world', () => {
    test
        .stdout()
        .command( [ 'hello:world' ] )
        .it( 'runs hello world cmd', ctx => {
            expect( ctx.stdout ).to.contain( 'hello world!' );
        } );
} );
