/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express();
const cors = require('cors')
const port = 3000;

app.use(cors())

app.use(morgan('tiny'))
app.use(bodyParser.json());

// Routes
const routes = require( './routes/<%= apiConfiguration %>.cjs' );

app.use( '/api/<%= apiConfiguration %>', routes );

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send({
        errorCode: err.code,
        errorMessage: err.message
    } );
} );

app.listen( port, () => {
    console.log( `App listening on port ${ port }` );
} );
